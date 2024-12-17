import LoggedHeader from "@/components/logged-header";
import DesktopMenu from "@/components/desktop-menu";
import MobileMenu from "@/components/mobile-menu";
import clsx from "clsx";
import { useContext, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { UserContext } from "@/contexts/user-context";
import { useGetUserFolderTree } from "@/api/queries/users-queries";
import { useGetSharedFolderTree } from "@/api/queries/shared-nodes-queries";

export default function LoggedLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMenuVisibility = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };
  const { user } = useContext(UserContext);
  const { hash } = useParams();
  const userId = user?.userId;
  const { folderTree } = useGetUserFolderTree(userId);
  const { sharedFolderTree } = useGetSharedFolderTree(hash);
  const sharedFolderTreeBasedOnRoute = hash ? sharedFolderTree : undefined;

  return (
    <div className={clsx("h-full min-h-fit w-full flex")}>
      <MobileMenu
        sharedFolderTree={sharedFolderTreeBasedOnRoute}
        isOpen={isMobileMenuOpen}
        handleIsMenuVisibility={handleMenuVisibility}
        folderTree={folderTree}
      />
      <DesktopMenu
        folderTree={folderTree}
        sharedFolderTree={sharedFolderTreeBasedOnRoute}
      />
      <div className="flex flex-col px-3 w-full">
        <LoggedHeader handleMenuVisibility={handleMenuVisibility} />
        <Outlet />
      </div>
    </div>
  );
}
