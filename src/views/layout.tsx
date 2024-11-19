import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";
import LoggedLayout from "./logged-layout";
import GuestLayout from "./guest-layout";

export default function Layout() {
  const { user } = useContext(UserContext);
  const isLogged = !!user;
  return isLogged ? <LoggedLayout /> : <GuestLayout />;
}
