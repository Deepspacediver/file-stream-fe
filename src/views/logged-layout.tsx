import LoggedHeader from "@/components/logged-header";
import DesktopMenu from "@/components/desktop-menu";
import MobileMenu from "@/components/mobile-menu";
import clsx from "clsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function LoggedLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMenuVisibility = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };
  return (
    <div className={clsx("h-full min-h-fit w-full flex")}>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        handleIsMenuVisibility={handleMenuVisibility}
      />
      <DesktopMenu />
      <div className="flex flex-col px-3 w-full">
        <LoggedHeader handleMenuVisibility={handleMenuVisibility} />
        <Outlet />
      </div>
    </div>
  );
}
