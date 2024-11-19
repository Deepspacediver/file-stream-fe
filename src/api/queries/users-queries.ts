import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../services/users-services";
import { useNavigate } from "react-router-dom";

const BASE_KEY = "users";

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_KEY] });
      navigate("/");
    },
  });

  return { createUser, isPending };
};
