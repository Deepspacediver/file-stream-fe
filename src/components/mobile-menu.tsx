import clsx from "clsx";
import CustomNavlink from "./custom-navlink";
import CloseIcon from "@/assets/icons/close-icon.svg?react";

type MobileMenuProps = {
  className?: string;
  handleIsMenuVisibility: () => void;
  isOpen: boolean;
};

export default function MobileMenu({
  isOpen,
  handleIsMenuVisibility,
  className,
}: MobileMenuProps) {
  return (
    <aside
      className={clsx(
        "bg-gradient-vertical lg:hidden w-full max-w-80 absolute top-0 h-full z-10 transition-all transform -translate-x-full",
        isOpen && "translate-x-0",
        className
      )}
    >
      <div className="flex mx-auto items-center p-5 gap-2">
        <CustomNavlink to="/" className="no-underline">
          <h1 className="text-4xl font-medium text-col-white">FileStream</h1>
        </CustomNavlink>
        <CloseIcon
          className="w-10 h-10 text-col-white ml-auto hover:cursor-pointer"
          onClick={() => {
            handleIsMenuVisibility();
          }}
        />
      </div>
    </aside>
  );
}
