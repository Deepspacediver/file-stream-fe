import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, useContext, useEffect } from "react";
import Button from "@/components/button";
import CustomNavlink from "@/components/custom-navlink";
import { useLogin } from "@/api/queries/auth-queries";
import { CONTAINS_WHITE_SPACE_REGEX } from "@/constants/regex";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/user-context";
import { ButtonVariants } from "@/constants/button-variants";

const LoginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username cannot be empty" })
    .regex(CONTAINS_WHITE_SPACE_REGEX, {
      message: "Username cannot contain spaces",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password cannot be empty" })
    .regex(CONTAINS_WHITE_SPACE_REGEX, {
      message: "Password cannot contain spaces",
    }),
});
type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginPage() {
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
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { loginUser, isLoading } = useLogin();

  const onSubmit = (data: LoginSchemaType, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    loginUser(data);
  };

  return (
    <div className="transparent-background w-10/12 max-w-xl mx-auto ">
      <h2 className="text-3xl mb-6 font-medium">Log in</h2>
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
        <p className="text-xl">
          Don't have an account?{" "}
          <CustomNavlink to={"/register"}>Create an account</CustomNavlink>
        </p>
        <Button
          disabled={!isValid || isLoading}
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
