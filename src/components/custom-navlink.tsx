import clsx from "clsx";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type CustomNavlinkProps = {
  className?: string;
  children: ReactNode;
  to: string;
};

export default function CustomNavlink({
  children,
  to,
  className,
}: CustomNavlinkProps) {
  return (
    <NavLink
      className={clsx("font-medium underline", className && className)}
      to={to}
    >
      {children}
    </NavLink>
  );
}
