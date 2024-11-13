import axiosClient from "@/lib/axios-client";
import { LoginRequest, UserWithoutPassword } from "@/types/user-types";

enum AuthRoutes {
  AUTH = "/auth",
  LOGIN = "/auth/login",
  ME = "/auth/me",
}

export const login = async ({ username, password }: LoginRequest) => {
  const { data } = await axiosClient.post<UserWithoutPassword>(
    AuthRoutes.LOGIN,
    {
      password,
      username,
    }
  );
  return data;
};

export const getLoggedUserData = async () => {
  const { data } = await axiosClient.get<UserWithoutPassword>(AuthRoutes.ME);
  return data;
};
