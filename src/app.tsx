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
import Loader from "./components/loader";

const router = createBrowserRouter(routes);

export default function App() {
  //User falsy states :undefied - initial state | null - set manually
  const [user, setUser] = useState<UserWithoutPassword | null | undefined>();
  const { user: userResponse, isLoading } = useGetLoggedUserData(
    !getIsLogged()
  );

  const userValue = user === null || !!user ? user : userResponse;

  useEffect(() => {
    if (userResponse) {
      setIsLogged();
      setUser(userResponse);
    }
  }, [userResponse]);

  if (isLoading) {
    return <Loader isFullScreen />;
  }

  return (
    <UserContext.Provider value={{ user: userValue, setUser }}>
      <AxiosWrapper>
        <RouterProvider router={router} />
      </AxiosWrapper>
    </UserContext.Provider>
  );
}
