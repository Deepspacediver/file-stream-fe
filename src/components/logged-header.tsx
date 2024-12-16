import HamburgerIcon from "@/assets/icons/hamburger-menu-icon.svg?react";
import UserMenu from "./user-menu";
import NodeButton from "./node-button";
import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";

type LoggedHeaderProps = {
  handleMenuVisibility: () => void;
};

export default function LoggedHeader({
  handleMenuVisibility,
}: LoggedHeaderProps) {
  const { user } = useContext(UserContext);
  const isLogged = !!user;
  return (
    <header className="flex flex-row w-full min-h-16 h-18 items-center gap-1 border-b-2 border-col-gray p-2">
      <HamburgerIcon
        className="w-5 h-5 mx-0 mr-auto lg:hidden min-w-fit hover:cursor-pointer"
        onClick={() => {
          handleMenuVisibility();
        }}
      />
      {isLogged && (
        <>
          <NodeButton />
          <UserMenu />
        </>
      )}
    </header>
  );
}
