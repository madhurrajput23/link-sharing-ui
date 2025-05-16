import type { UserInfo } from "../domain/user";
import {
  useGetUserInfoService,
  useSaveProfilePictureService,
  useSaveUserInfoService,
} from "../services/userInfoAdapter";
import type { IGetUserInfo, ISaveProfilePicture } from "./ports";

export function useGetUserInfo() {
  const getUserInfoService: IGetUserInfo = useGetUserInfoService();

  async function getUserInfo() {
    return getUserInfoService.getUserInfo();
  }

  return getUserInfo;
}

export function useSaveUserInfo() {
  const saveUserInfoService = useSaveUserInfoService();

  async function saveUserInfo(userInfo: UserInfo) {
    return saveUserInfoService.saveUserInfo(userInfo);
  }

  return saveUserInfo;
}

export function useSaveProfilePicture() {
  const saveProfilePictureService: ISaveProfilePicture =
    useSaveProfilePictureService();

  async function saveProfilePicture(picture: File) {
    return saveProfilePictureService.saveProfilePicture(picture);
  }

  return saveProfilePicture;
}
