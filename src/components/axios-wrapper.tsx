import { ReactNode, useContext } from "react";
import axiosClient from "@/lib/axios-client";
import { UserContext } from "@/contexts/user-context";
import { clearIsLogged } from "@/helpers/local-storage-helpers";

export default function AxiosWrapper({ children }: { children: ReactNode }) {
  const { setUser } = useContext(UserContext);

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        setUser(null);
        clearIsLogged();
      }
    }
  );

  return <>{children}</>;
}
