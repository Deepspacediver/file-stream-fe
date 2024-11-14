import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/router/routes";
import { useEffect, useState } from "react";
import { UserWithoutPassword } from "@/types/user-types";
import { useGetLoggedUserData } from "@/api/queries/auth-queries";
import { getIsLogged, setIsLogged } from "@/helpers/local-storage-helpers";
import { UserContext } from "@/contexts/user-context";
import AxiosWrapper from "./components/axios-wrapper";
import "@/assets/styles/reset.css";
import "@/assets/styles/index.css";

const router = createBrowserRouter(routes);

export default function App() {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const { user: userResponse } = useGetLoggedUserData(!!user || !getIsLogged());

  useEffect(() => {
    if (userResponse) {
      setIsLogged();
      setUser(userResponse);
    }
  }, [userResponse]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AxiosWrapper>
        <RouterProvider router={router} />
      </AxiosWrapper>
    </UserContext.Provider>
  );
}
