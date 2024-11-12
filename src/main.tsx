import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/reset.css";
import "@/assets/styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/router/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/query-client";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
