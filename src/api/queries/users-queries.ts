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
import { FolderContentRequest, NodeTypes } from "@/types/node-types";
import showToast from "@/lib/show-toast";
import { AxiosError } from "axios";

const BASE_KEY = "users";
const NODE_KEY = "nodes";
const FOLDER_TREE_KEY = "folders_tree";
const FOLDER_FLAT_KEY = "folders_flat";
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
    queryKey: [NODE_KEY, userId, FOLDER_FLAT_KEY],
  });

  return { folders, isLoading };
};

export const useCreateFolder = (userId: number, callback?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: createNewFolder, isPending: isLoading } = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NODE_KEY, userId] });
      if (callback) {
        callback();
      }
      showToast("Folder successfully created");
    },
    onError: () => {
      if (callback) {
        callback();
      }
    },
  });

  return { createNewFolder, isLoading };
};

export const useCreateFile = (userId: number, callback?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: createNewFile, isPending: isLoading } = useMutation({
    mutationFn: createFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [NODE_KEY, userId, FOLDER_CONTENT],
      });
      if (callback) {
        callback();
      }
      showToast("File  successfully created");
    },
    onError: (err) => {
      if (callback) {
        callback();
      }
      if (err instanceof AxiosError) {
        const errorMessage = err?.response?.data.error;
        return showToast(errorMessage, "error");
      }
      return showToast(err.message, "error");
    },
  });

  return {
    createNewFile,
    isLoading,
  };
};

export const useUpdateNode = (userId: number, callback?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: updateNodeData, isPending: isLoading } = useMutation({
    mutationFn: updateNode,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [NODE_KEY, userId],
      });

      const isFile = data.type === NodeTypes.FILE;
      showToast(`${isFile ? "File" : "Folder"} successfully updated`);
      if (callback) {
        callback();
      }
    },
    onError: (err) => {
      if (callback) {
        callback();
      }
      if (err instanceof AxiosError) {
        const errorMessage = err?.response?.data.error;
        return showToast(errorMessage, "error");
      }
      return showToast(err.message, "error");
    },
  });

  return {
    updateNodeData,
    isLoading,
  };
};

export const useGetUserFolderTree = (userId?: number) => {
  const { data: folderTree, isLoading } = useQuery({
    queryKey: [NODE_KEY, userId, FOLDER_TREE_KEY],
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
    queryKey: [NODE_KEY, userId, FOLDER_CONTENT, nodeId],
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
        queryKey: [NODE_KEY, userId],
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
