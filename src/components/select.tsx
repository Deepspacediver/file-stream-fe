import { forwardRef, HTMLAttributes } from "react";
import FormError from "./form-error";
import { FieldError } from "react-hook-form";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { SelectOption } from "@/types/option-types";

type SelectProps = {
  options: SelectOption[];
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  error?: FieldError;
} & HTMLAttributes<HTMLSelectElement>;

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, error, label, labelClassName, wrapperClassName, ...rest },
  ref
) {
  const hasError = !!error && !!error.message;

  return (
    <div className={twMerge("flex flex-col gap-1", wrapperClassName)}>
      {label && (
        <label
          className={twMerge(clsx("text-xl font-medium", labelClassName))}
          htmlFor={rest.id}
        >
          {label}:
        </label>
      )}
      <select
        className={twMerge(
          clsx(
            "hover:cursor-pointer text-lg p-2 w-full focus:outline-none bg-col-white-transparent",
            hasError && "bg-col-error-transparent"
          )
        )}
        ref={ref}
        {...rest}
      >
        {!!options.length &&
          options.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </select>
      {hasError && <FormError error={error} />}
    </div>
  );
});
