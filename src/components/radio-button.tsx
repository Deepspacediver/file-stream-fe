import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  function RadioButton({ label, id, checked, type = "radio", ...rest }, ref) {
    return (
      <label className="cursor-pointer flex gap-2 items-center" htmlFor={id}>
        <div className="flex items-center justify-center w-[18px] h-[18px] border-col- border-[2px] rounded-[50%] bg-transparent">
          <span
            className={twMerge(
              clsx(
                "inline-block w-[8px] h-[8px] bg-col-white rounded-[50%] scale-0 transition-all",
                checked && "scale-100"
              )
            )}
          ></span>
        </div>

        {label}

        <input
          className={`opacity-0 w-0 h-0 appearance-none`}
          {...rest}
          ref={ref}
          type={type}
          id={id}
          checked={checked}
        />
      </label>
    );
  }
);

export default RadioButton;
