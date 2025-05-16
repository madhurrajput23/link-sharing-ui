import { account } from "../lib/appwrite";
import { v4 as uuidv4 } from "uuid";
import { notifyError, notifySuccess } from "./notification";
import type {
  ICreateUser,
  IEmailLoginUser,
  ILogoutUser,
} from "../application/ports";

export const useCreateUserService = (): ICreateUser => {
  const createUser = async (email: string, password: string) => {
    try {
      await account.create(uuidv4(), email, password);
      const res2 = await account.createEmailPasswordSession(email, password);
      notifySuccess("User created successfully");
      return res2.userId;
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return { createUser };
};

export const useEmailLoginUserService = (): IEmailLoginUser => {
  const emailLoginUser = async (email: string, password: string) => {
    try {
      const res = await account.createEmailPasswordSession(email, password);
      notifySuccess("Login successful");
      return res.userId;
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return { emailLoginUser };
};

export const useLogoutService = (): ILogoutUser => {
  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      notifySuccess("Logout successful");
    } catch (error: any) {
      notifyError(error.message);
    }
  };

  return { logoutUser };
};
