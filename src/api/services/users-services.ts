import axiosClient from "@/lib/axios-client";
import { CreateFile, NodeObject, UserFolderResponse } from "@/types/node-types";
import { CreateUser, UserWithoutPassword } from "@/types/user-types";
import { CreateFolder } from "@/types/node-types";

enum UserRoutes {
  USERS = "/users",
  USER_FOLDERS = "/folders",
  NODES = "/nodes",
}

export const createFolder = async (payload: CreateFolder) => {
  const { userId, ...rest } = payload;
  const { data } = await axiosClient.post<NodeObject>(
    `${UserRoutes.USERS}/${userId}${UserRoutes.NODES}`,
    {
      ...rest,
    }
  );
  return data;
};

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

export const createFile = async (payload: CreateFile) => {
  const { userId, ...rest } = payload;
  const { data } = await axiosClient.post<NodeObject>(
    `${UserRoutes.USERS}/${userId}${UserRoutes.NODES}`,
    {
      ...rest,
    },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};
