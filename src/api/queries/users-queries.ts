import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFile,
  createFolder,
  getUserFolders,
  registerUser,
} from "../services/users-services";
import { useNavigate } from "react-router-dom";
import { setIsLogged } from "@/helpers/local-storage-helpers";
import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import { UserFolderResponse } from "@/types/node-types";

const BASE_KEY = "users";
const FOLDERS_KEY = "user_folders";
const FILES_KEY = "user_files";

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
