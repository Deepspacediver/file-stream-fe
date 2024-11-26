import axiosClient from "@/lib/axios-client";
import { CreateUser } from "@/types/user-types";

enum UserRoutes {
  USERS = "/users",
}

export const registerUser = async ({ username, password }: CreateUser) => {
  await axiosClient.post(`${UserRoutes.USERS}`, {
    username,
    password,
  });
};
