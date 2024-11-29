import HomeView from "@/views/home-view";
import Layout from "@/views/layout";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import { ReactElement } from "react";
import FolderView from "@/views/folder-view";
import ProtectedRoute from "@/components/protected-route";

type Route = {
  path: string;
  element: ReactElement;
  children?: Route[];
};

export const routes: Route[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomeView /> },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/folders/:folderId",
        element: <ProtectedRoute component={<FolderView />} />,
      },
    ],
  },
];
