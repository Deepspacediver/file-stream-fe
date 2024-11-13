import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoggedUserData, login } from "../services/auth-services";

const BASE_KEY = "auth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_KEY] });
    },
  });

  return { loginUser };
};

export const useGetLoggedUserData = () => {
  const { data: user, isLoading } = useQuery({
    queryFn: getLoggedUserData,
    queryKey: [BASE_KEY],
  });

  return {
    user,
    isLoading,
  };
};
