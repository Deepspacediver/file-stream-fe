import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoggedUserData, login } from "../services/auth-services";
import { setIsLogged } from "@/helpers/local-storage-helpers";
import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";

const BASE_KEY = "auth";

export const useLogin = () => {
  const { setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { mutate: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setIsLogged();
      setUser(user);
      queryClient.invalidateQueries({ queryKey: [BASE_KEY] });
    },
  });

  return { loginUser };
};

export const useGetLoggedUserData = (isDisabled?: boolean) => {
  const { data: user, isLoading } = useQuery({
    queryFn: getLoggedUserData,
    queryKey: [BASE_KEY],
    enabled: !isDisabled,
    retry: 0,
  });

  return {
    user,
    isLoading,
  };
};
