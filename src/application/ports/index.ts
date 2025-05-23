import type { ILink } from "../../domain/link";
import type { UserInfo } from "../../domain/user";

export interface ICreateUser {
  createUser: (email: string, password: string) => Promise<string | null>;
}

export interface IEmailLoginUser {
  emailLoginUser: (email: string, password: string) => Promise<string | null>;
}

export interface ILogoutUser {
  logoutUser: () => Promise<void>;
}

export interface IGetUserInfo {
  getUserInfo: () => Promise<UserInfo | null>;
}

export interface ISaveUserInfo {
  saveUserInfo: (userInfo: UserInfo) => Promise<boolean>;
}

export interface ISaveProfilePicture {
  saveProfilePicture: (picture: File) => Promise<string> | null;
}

export interface ISaveLink {
  saveLink: (
    id: string,
    url: string,
    platform: string,
    isOther: boolean
  ) => Promise<string | null>;
}

export interface IGetLinks {
  getLinks: () => Promise<ILink[] | null>;
}

export interface IDeleteLink {
  deleteLink: (id: string) => Promise<boolean>;
}
