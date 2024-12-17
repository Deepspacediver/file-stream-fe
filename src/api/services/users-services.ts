import axiosClient from "@/lib/axios-client";
import {
  CreateFile,
  DeleteNodeRequest,
  EditNodeRequest,
  FolderContentRequest,
  FolderContentResponse,
  FolderTree,
  NodeObject,
  UserFolderResponse,
} from "@/types/node-types";
import { CreateUser, UserWithoutPassword } from "@/types/user-types";
import { CreateFolder } from "@/types/node-types";

enum UserRoutes {
  USERS = "/users",
  USER_FOLDERS = "/folders",
  FOLDER_TREE = "/folder-tree",
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

export const getUserFolderTree = async (userId: number) => {
  const { data } = await axiosClient.get<FolderTree>(
    `${UserRoutes.USERS}/${userId}${UserRoutes.FOLDER_TREE}`
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

export const getFolderContent = async ({
  userId,
  nodeId,
}: FolderContentRequest) => {
  const { data } = await axiosClient.get<FolderContentResponse>(
    `${UserRoutes.USERS}/${userId}${UserRoutes.USER_FOLDERS}/${nodeId}`
  );

  return data;
};

export const updateNode = async ({
  nodeId,
  name,
  parentNodeId,
  userId,
}: EditNodeRequest) => {
  const { data } = await axiosClient.put<NodeObject>(
    `${UserRoutes.USERS}/${userId}${UserRoutes.NODES}/${nodeId}`,
    {
      parentNodeId,
      name,
    }
  );

  return data;
};

export const deleteNode = async ({ nodeId, userId }: DeleteNodeRequest) => {
  await axiosClient.delete(
    `${UserRoutes.USERS}/${userId}${UserRoutes.NODES}/${nodeId}`
  );
};
