import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        clsx(
          "magnify p-2 bg-col-white text-col-black rounded-md w-fit min-w-32",
          className
        )
      )}
    >
      {children}
    </button>
  );
}
