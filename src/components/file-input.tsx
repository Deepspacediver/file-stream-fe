import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import FormError from "./form-error";
import clsx from "clsx";

type FileInputProps = {
  label: string;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    { name, error, label, type = "file", onChange, ...rest },
    ref
  ) {
    console.log(error);
    const [fileName, setFileName] = useState("");
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.currentTarget.files;
      const file = !!fileList && fileList[0];
      if (!file) {
        return setFileName("");
      }
      setFileName(file.name);
    };
    const hasError = !!error && !!error.message;
    return (
      <div
        className={clsx(
          "flex flex-col gap-1 w-full",
          hasError && "text-col-error"
        )}
      >
        <label
          className="flex flex-col sm:flex-row gap-1 text-xl font-medium w-full"
          htmlFor={name}
        >
          <span className="w-fit max-h-fit cursor-pointer magnify inline-block p-3 rounded-xl bg-col-white text-col-black">
            {label}
          </span>
          {!!fileName && (
            <p className="text-base flex items-center">{fileName}</p>
          )}
        </label>

        <input
          className="opacity-0 w-0 h-0 absolute pointer-events-none top-80"
          name={name}
          type={type}
          id={name}
          {...rest}
          ref={ref}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
            handleFileUpload(e);
          }}
        />
        {error && <FormError error={error} />}
      </div>
    );
  }
);

export default FileInput;
