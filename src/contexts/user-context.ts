import { createContext, Dispatch, SetStateAction } from "react";
import { UserWithoutPassword } from "@/types/user-types";

export type UserContext = {
  user: UserWithoutPassword | null | undefined;
  setUser: Dispatch<SetStateAction<UserWithoutPassword | null | undefined>>;
};

export const UserContext = createContext({} as UserContext);
