import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/reset.css";
import "@/assets/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="font-bold">Hello world</div>
  </StrictMode>
);
