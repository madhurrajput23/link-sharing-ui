import type { User } from "../domain/user";
import {
  useCreateUserService,
  useEmailLoginUserService,
  useLogoutService,
} from "../services/userAdapter";
import type { ICreateUser, IEmailLoginUser } from "./ports";

export function useCreateUser() {
  const createUserService: ICreateUser = useCreateUserService();

  async function createUser(user: User) {
    return createUserService.createUser(user.email, user.password);
  }

  return createUser;
}

export function useEmailLoginUser() {
  const emailLoginUserService: IEmailLoginUser = useEmailLoginUserService();

  async function emailLoginUser(user: User) {
    return emailLoginUserService.emailLoginUser(user.email, user.password);
  }

  return emailLoginUser;
}

export function useLogoutUser() {
  const logoutService = useLogoutService();

  async function logoutUser() {
    return logoutService.logoutUser();
  }

  return logoutUser;
}
