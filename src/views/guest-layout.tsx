import Header from "@/components/header";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="h-full  min-h-fit bg-gradient-vertical">
      <Header />
      <Outlet />
    </div>
  );
}
