import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="mx-auto scale-95 hover:scale-100  transition-transform p-2 bg-col-white text-col-black rounded-md w-fit min-w-32"
    >
      {children}
    </button>
  );
}
