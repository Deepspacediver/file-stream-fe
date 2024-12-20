import clsx from "clsx";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type CustomNavlinkProps = {
  className?: string;
  children: ReactNode;
  to: string;
  isButton?: boolean;
};

export default function CustomNavlink({
  children,
  to,
  className,
  isButton,
}: CustomNavlinkProps) {
  const buttonStyles =
    "w-fit min-w-32 text-center magnify rounded-2xl no-underline bg-col-white text-col-black p-2";
  return (
    <NavLink
      className={twMerge(
        clsx("underline", isButton && buttonStyles, className)
      )}
      to={to}
    >
      {children}
    </NavLink>
  );
}
