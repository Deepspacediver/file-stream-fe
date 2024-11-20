import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLoggedUserData,
  login,
  logoutUser,
} from "../services/auth-services";
import { clearIsLogged, setIsLogged } from "@/helpers/local-storage-helpers";
import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import { useNavigate } from "react-router-dom";

const BASE_KEY = "auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { mutate: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setIsLogged();
      setUser(user);
      queryClient.invalidateQueries({ queryKey: [BASE_KEY] });
      navigate("/");
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

export const useLogoutUser = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearIsLogged();
      setUser(null);
      navigate("/");
    },
  });

  return { logout, isLoading };
};
