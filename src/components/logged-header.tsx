import HamburgerIcon from "@/assets/icons/hamburger-menu-icon.svg?react";
import UserMenu from "./user-menu";
import NodeButton from "./node-button";

type LoggedHeaderProps = {
  handleMenuVisibility: () => void;
};

export default function LoggedHeader({
  handleMenuVisibility,
}: LoggedHeaderProps) {
  return (
    <header className="flex flex-row w-full h-18 items-center gap-1 border-b-2 border-col-gray p-2">
      <HamburgerIcon
        className="w-5 h-5 mx-0 mr-auto lg:hidden min-w-fit hover:cursor-pointer"
        onClick={() => {
          handleMenuVisibility();
        }}
      />
      <NodeButton />
      <UserMenu />
    </header>
  );
}
