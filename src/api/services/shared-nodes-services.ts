import axiosClient from "@/lib/axios-client";
import { ShareNodeRequest, ShareNodeResponse } from "@/types/node-types";
enum SharedNodesRoutes {
  SHARED = "/shared-nodes",
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
