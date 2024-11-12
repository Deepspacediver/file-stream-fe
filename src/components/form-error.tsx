import { FieldError } from "react-hook-form";

type FormErrorProps = {
  error: FieldError;
};

export default function FormError({ error }: FormErrorProps) {
  return <p>{error.message}</p>;
}
