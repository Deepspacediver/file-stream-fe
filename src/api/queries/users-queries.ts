import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFile,
  createFolder,
  deleteNode,
  getFolderContent,
  getUserFolders,
  getUserFolderTree,
  registerUser,
  updateNode,
} from "../services/users-services";
import { useNavigate } from "react-router-dom";
import { setIsLogged } from "@/helpers/local-storage-helpers";
import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import { FolderContentRequest, UserFolderResponse } from "@/types/node-types";

const BASE_KEY = "users";
const FOLDERS_KEY = "user_folders";
const FILES_KEY = "user_files";
const FOLDER_TREE_KEY = "user_folder_tree";
const FOLDER_CONTENT = "folder_content";

export const useRegisterUser = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      setUser(user);
      setIsLogged();
      queryClient.invalidateQueries({ queryKey: [BASE_KEY] });
      navigate("/");
    },
  });

  return { createUser, isLoading };
};

export const useGetUserFolders = (userId?: number) => {
  const { data: folders, isLoading } = useQuery({
    queryFn: () => getUserFolders(userId!),
    queryKey: [FOLDERS_KEY, userId],
  });

  return { folders, isLoading };
};

export const useCreateFolder = (userId: number) => {
  const queryClient = useQueryClient();
  const { mutate: createNewFolder, isPending: isLoading } = useMutation({
    mutationFn: createFolder,
    onSuccess: (data) => {
      const newFolder: UserFolderResponse = {
        name: data.name,
        nodeId: data.nodeId,
        parentNodeId: data.parentNodeId,
        userId: data.userId,
      };
      queryClient.setQueryData(
        [FOLDERS_KEY, userId],
        (oldData: UserFolderResponse[]) => {
          return [...oldData, newFolder];
        }
      );
    },
  });

  return { createNewFolder, isLoading };
};

export const useCreateFile = (userId: number) => {
  const queryClient = useQueryClient();
  const { mutate: createNewFile, isPending: isLoading } = useMutation({
    mutationFn: createFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FILES_KEY, userId] });
    },
  });

  return {
    createNewFile,
    isLoading,
  };
};

export const useUpdateNode = (userId: number) => {
  const queryClient = useQueryClient();
  const { mutate: updateNodeData, isPending: isLoading } = useMutation({
    mutationFn: updateNode,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FILES_KEY, FOLDERS_KEY, userId],
      });
    },
  });

  return {
    updateNodeData,
    isLoading,
  };
};

export const useGetUserFolderTree = (userId?: number) => {
  const { data: folderTree, isLoading } = useQuery({
    queryKey: [FOLDER_TREE_KEY, userId],
    queryFn: () => getUserFolderTree(userId!),
    enabled: !!userId,
  });
  return { isLoading, folderTree };
};

export const useGetFolderContent = ({
  userId,
  nodeId,
}: FolderContentRequest) => {
  const { data: folderWithContent, isLoading } = useQuery({
    queryFn: () => getFolderContent({ userId, nodeId }),
    queryKey: [FOLDER_CONTENT, nodeId, userId],
    enabled: !!userId && !!nodeId,
  });

  return {
    folderWithContent,
    isLoading,
  };
};

export const useDeleteNode = (userId?: number, callback?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: removeNode, isPending: isLoading } = useMutation({
    mutationFn: deleteNode,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FILES_KEY, FOLDERS_KEY, userId],
      });
      if (callback) {
        callback();
      }
    },
  });

  return {
    removeNode,
    isLoading,
  };
};
