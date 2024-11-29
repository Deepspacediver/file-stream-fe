import LoggedHeader from "@/components/logged-header";
import DesktopMenu from "@/components/desktop-menu";
import MobileMenu from "@/components/mobile-menu";
import clsx from "clsx";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "@/contexts/user-context";
import { useGetUserFolderTree } from "@/api/queries/users-queries";

export default function LoggedLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMenuVisibility = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };
  const { user } = useContext(UserContext);
  const userId = user?.userId;
  const { folderTree } = useGetUserFolderTree(userId);

  return (
    <div className={clsx("h-full min-h-fit w-full flex")}>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        handleIsMenuVisibility={handleMenuVisibility}
        folderTree={folderTree}
      />
      <DesktopMenu folderTree={folderTree} />
      <div className="flex flex-col px-3 w-full">
        <LoggedHeader handleMenuVisibility={handleMenuVisibility} />
        <Outlet />
      </div>
    </div>
  );
}
