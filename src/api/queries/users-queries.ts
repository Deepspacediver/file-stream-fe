import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../services/users-services";

const BASE_KEY = "users";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_KEY] });
    },
  });

  return { createUser, isPending };
};
