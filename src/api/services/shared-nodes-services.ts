import axiosClient from "@/lib/axios-client";
import {
  FolderContentResponse,
  ShareNodeRequest,
  ShareNodeResponse,
} from "@/types/node-types";
enum SharedNodesRoutes {
  SHARED = "/shared-nodes",
  FOLDER_TREE = "/shared-folder-tree",
}

export const createSharedNode = async ({
  userId,
  expiryDate,
  nodeId,
}: ShareNodeRequest) => {
  const { data } = await axiosClient.post<ShareNodeResponse>(
    SharedNodesRoutes.SHARED,
    {
      userId,
      expiryDate,
      nodeId,
    }
  );
  return data;
};

export const getSharedFolderTree = async (linkHash: string) => {
  const { data } = await axiosClient.get(
    `${SharedNodesRoutes.SHARED}/${linkHash}${SharedNodesRoutes.FOLDER_TREE}`
  );
  return data;
};

export const getSharedFolderWithContent = async (linkHash: string) => {
  const { data } = await axiosClient.get<FolderContentResponse>(
    `${SharedNodesRoutes.SHARED}/${linkHash}`
  );
  return data;
};
