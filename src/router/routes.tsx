import HomeGuest from "@/pages/home-guest";
import Layout from "@/pages/layout";
import RegisterPage from "@/pages/register-page";
import { ReactElement } from "react";

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
      { path: "/", element: <HomeGuest /> },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
];
