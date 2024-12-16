import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSharedNode,
  getSharedFolderTree,
  getSharedFolderWithContent,
} from "../services/shared-nodes-services";

const SHARED_NODE_KEY = "shared_node";
const SHARED_NODE_TREE_KEY = "shared_node_tree";

export const useCreateSharedNode = () => {
  const {
    mutate: shareFolder,
    isPending: isLoading,
    isSuccess,
    reset,
    data: response,
  } = useMutation({
    mutationFn: createSharedNode,
  });

  return { shareFolder, isLoading, isSuccess, response, reset };
};

export const useGetSharedFolderWithContent = (
  linkHash?: string,
  isDisabled?: boolean
) => {
  const { data: sharedFolderContent, isLoading } = useQuery({
    enabled: !!linkHash && !isDisabled,
    queryFn: () => getSharedFolderWithContent(linkHash!),
    queryKey: [SHARED_NODE_KEY],
  });

  return {
    sharedFolderContent,
    isLoading,
  };
};

export const useGetSharedFolderTree = (
  linkHash?: string,
  isDisabled?: boolean
) => {
  const { data: sharedFolderContent, isLoading } = useQuery({
    enabled: !!linkHash || !!isDisabled,
    queryFn: () => getSharedFolderTree(linkHash!),
    queryKey: [SHARED_NODE_KEY, SHARED_NODE_TREE_KEY],
  });

  return {
    sharedFolderContent,
    isLoading,
  };
};
