import { createContext, Dispatch, SetStateAction } from "react";
import { UserWithoutPassword } from "@/types/user-types";

export type UserContext = {
  user: UserWithoutPassword | null;
  setUser: Dispatch<SetStateAction<UserWithoutPassword | null>>;
};

export const UserContext = createContext({} as UserContext);
