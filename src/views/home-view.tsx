import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";
import HomeGuest from "../pages/home-guest";
import Dashboard from "../pages/dashboard";

export default function HomeView() {
  const { user } = useContext(UserContext);
  const isLogged = !!user;

  return isLogged ? <Dashboard /> : <HomeGuest />;
}
