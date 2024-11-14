import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, useContext } from "react";
import Button from "@/components/button";
import CustomNavlink from "@/components/custom-navlink";
import { useLogin } from "@/api/queries/auth-queries";
import { CONTAINS_WHITE_SPACE_REGEX } from "@/constants/regex";
import { UserContext } from "@/contexts/user-context";

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
  const { user } = useContext(UserContext);
  console.log({ user });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { loginUser } = useLogin();

  const onSubmit = (data: LoginSchemaType, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    loginUser(data);
  };

  return (
    <div className="shadow-2xl rounded-md p-8 w-10/12 max-w-xl mx-auto text-white bg-col-white-transparent">
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
        <Button>Submit</Button>
      </form>
    </div>
  );
}
