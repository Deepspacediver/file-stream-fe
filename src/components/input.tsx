import { forwardRef, InputHTMLAttributes } from "react";
import FormError from "./form-error";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

type InputProps = {
  label: string;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, name, error, ...rest },
  ref
) {
  const hasError = !!error && !!error.message;
  return (
    <div
      className={clsx(
        "flex flex-col gap-1 w-full",
        hasError && "text-col-error"
      )}
    >
      <label className="text-xl font-medium" htmlFor={name}>
        {label}:
      </label>
      <input
        className={clsx("peer w-full px-1 focus:outline-none bg-transparent")}
        name={name}
        id={name}
        {...rest}
        ref={ref}
      />
      <span className={clsx("input-underline", hasError && "bg-col-error")} />
      {error && <FormError error={error} />}
    </div>
  );
});

export default Input;
