import { createRoot } from "react-dom/client";
import App from "./app";
import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/query-client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
