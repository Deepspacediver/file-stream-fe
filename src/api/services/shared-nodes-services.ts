import axiosClient from "@/lib/axios-client";
import {
  FolderContentResponse,
  FolderTree,
  GetSharedFolderContentRequest,
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
  const { data } = await axiosClient.get<FolderTree>(
    `${SharedNodesRoutes.SHARED}/${linkHash}${SharedNodesRoutes.FOLDER_TREE}`
  );
  return data;
};

export const getSharedFolderWithContent = async ({
  linkHash,
  nodeId,
}: GetSharedFolderContentRequest) => {
  const { data } = await axiosClient.get<FolderContentResponse>(
    `${SharedNodesRoutes.SHARED}/${linkHash}`,
    { params: { nodeId } }
  );
  return data;
};
