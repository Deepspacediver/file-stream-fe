import { ButtonVariants } from "@/constants/button-variants";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Loader from "@components/loader";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariants;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant,
  className,
  disabled,
  isLoading,
  ...rest
}: ButtonProps) {
  const ButtonStyles = {
    SUBMIT: `text-xl font-medium min-h-14 ${disabled && "text-gray-400"}`,
  };

  return (
    <button
      disabled={disabled || isLoading}
      {...rest}
      className={twMerge(
        clsx(
          "magnify p-2 bg-col-white text-col-black rounded-md w-fit min-w-32",
          variant && ButtonStyles[variant],
          className
        )
      )}
    >
      {isLoading ? <Loader className="h-8 w-8 mx-auto" /> : children}
    </button>
  );
}
