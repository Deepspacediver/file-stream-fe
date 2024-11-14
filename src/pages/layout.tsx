import Header from "@/components/header";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={clsx("bg-gradient-vertical h-full  min-h-fit")}>
      <Header />
      <Outlet />
    </div>
  );
}
