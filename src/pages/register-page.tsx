import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import {
  CONTAINS_LOWER_CASE_REGEX,
  CONTAINS_NUMBER_REGEX,
  CONTAINS_UPPER_CASE_REGEX,
} from "@/constants/regex";
import Button from "@/components/button";
import { useRegisterUser } from "@/api/queries/users-queries";

const PasswordSchema = z.coerce
  .string({
    message: "Password is required",
  })
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(CONTAINS_NUMBER_REGEX, "Password must contain a number")
  .regex(
    CONTAINS_UPPER_CASE_REGEX,
    "Password must contain an upper case letter"
  )
  .regex(
    CONTAINS_LOWER_CASE_REGEX,
    "Password must contain a lower case letter"
  );

const RegisterSchema = z
  .object({
    username: z
      .string({ message: "Username is required" })
      .min(5, { message: "Username must be at least 5 characters long" })
      .max(20, { message: "Username cannot be longer than 20 characters" }),
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords are not the same",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { createUser } = useRegisterUser();

  const onSubmit = (data: RegisterSchemaType, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    console.log(data);
    createUser({ username: data.username, password: data.password });
  };

  return (
    <div className="shadow-2xl rounded-md p-8 w-10/12 max-w-xl mx-auto text-white bg-col-white-transparent">
      <h2 className="text-3xl mb-6 font-medium">Create an account</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <Input
          label="Username"
          {...register("username")}
          error={errors["username"]}
        />
        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={errors["password"]}
        />
        <Input
          label="Confirm password"
          type="password"
          {...register("confirmPassword")}
          error={errors["confirmPassword"]}
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
}
