import { useMutation } from "@tanstack/react-query";
import { createSharedNode } from "../services/shared-nodes-services";

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
