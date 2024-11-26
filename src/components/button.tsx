import { ButtonVariants } from "@/constants/button-variants";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariants;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const ButtonStyles = {
    SUBMIT: `text-xl font-medium ${disabled && "text-gray-400"}`,
  };

  return (
    <button
      //Disabled not working
      disabled={disabled}
      {...rest}
      className={twMerge(
        clsx(
          "magnify p-2  bg-col-white text-col-black rounded-md w-fit min-w-32",
          variant && ButtonStyles[variant],
          className
        )
      )}
    >
      {children}
    </button>
  );
}
