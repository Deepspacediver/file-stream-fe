import { UserContext } from "@/contexts/user-context";
import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  component: ReactNode;
};

export default function ProtectedRoute({ component }: ProtectedRouteProps) {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const requestedPage = location.pathname;

  return user ? (
    component
  ) : (
    <Navigate state={{ error: 401, requestedPage }} to={"/login"} />
  );
}
