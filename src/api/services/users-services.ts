import axiosClient from "@/lib/axios-client";
import { UserFolderResponse } from "@/types/node-types";
import { CreateUser, UserWithoutPassword } from "@/types/user-types";

enum UserRoutes {
  USERS = "/users",
  USER_FOLDERS = "/folders",
}

export const registerUser = async ({ username, password }: CreateUser) => {
  const { data } = await axiosClient.post<UserWithoutPassword>(
    `${UserRoutes.USERS}`,
    {
      username,
      password,
    }
  );
  return data;
};

export const getUserFolders = async (userId: number) => {
  const { data } = await axiosClient.get<UserFolderResponse[]>(
    `${UserRoutes.USERS}/${userId}${UserRoutes.USER_FOLDERS}`
  );
  return data;
};
