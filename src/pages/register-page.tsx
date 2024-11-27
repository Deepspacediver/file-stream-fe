import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, useContext, useEffect } from "react";
import {
  CONTAINS_LOWER_CASE_REGEX,
  CONTAINS_NUMBER_REGEX,
  CONTAINS_UPPER_CASE_REGEX,
  CONTAINS_WHITE_SPACE_REGEX,
} from "@/constants/regex";
import Button from "@/components/button";
import { useRegisterUser } from "@/api/queries/users-queries";
import CustomNavlink from "@/components/custom-navlink";
import { UserContext } from "@/contexts/user-context";
import { useNavigate } from "react-router-dom";
import { ButtonVariants } from "@/constants/button-variants";

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
  .regex(CONTAINS_LOWER_CASE_REGEX, "Password must contain a lower case letter")
  .regex(CONTAINS_WHITE_SPACE_REGEX, {
    message: "Password cannot contain spaces",
  });

const RegisterSchema = z
  .object({
    username: z
      .string({ message: "Username is required" })
      .min(5, { message: "Username must be at least 5 characters long" })
      .max(20, { message: "Username cannot be longer than 20 characters" })
      .regex(CONTAINS_WHITE_SPACE_REGEX, {
        message: "Username cannot contain spaces",
      }),
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
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const {
    handleSubmit,
    formState: { errors, isValid },
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

  const { createUser, isLoading } = useRegisterUser();

  const onSubmit = (data: RegisterSchemaType, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    createUser({ username: data.username, password: data.password });
  };

  return (
    <div className="transparent-background p-8 w-10/12 max-w-xl mx-auto">
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
        <p className="text-xl">
          Already a user? <CustomNavlink to={"/login"}>Login</CustomNavlink>
        </p>
        <Button
          disabled={!isValid}
          isLoading={isLoading}
          variant={ButtonVariants.SUBMIT}
          className="mx-auto"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
