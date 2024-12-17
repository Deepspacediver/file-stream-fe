import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";
import LoggedLayout from "./logged-layout";
import GuestLayout from "./guest-layout";
import { useParams } from "react-router-dom";

export default function Layout() {
  const { user } = useContext(UserContext);
  const { hash } = useParams();
  const isLogged = !!user;
  const isSharedFolderView = !!hash;
  return isLogged || isSharedFolderView ? <LoggedLayout /> : <GuestLayout />;
}
