import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "./FormField";
import InlineLink from "./InlineLink";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,64}$/;

const SignupFormSchema = z
  .object({
    username: z.string().trim().min(1).max(16),
    password: z.string().trim().regex(PASSWORD_REGEX),
    passwordRepeat: z.string().trim(),
    email: z.string().email().trim(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
    path: ["passwordRepeat"],
  });

type SignupFormValues = z.infer<typeof SignupFormSchema>;

const SignupForm: FC = () => {
  const queryClient = useQueryClient();
  const signUp = useMutation(
    ({ username, password, email }: SignupFormValues) => {
      return axios.post<{ access_token: string }>("/auth/signup", {
        username,
        password,
        email,
      });
    },
    {
      onSuccess: (resp) => {
        // TODO: store access token as HTTP-Only cookie
      },
    }
  );

  const { register, handleSubmit } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    signUp.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm">
        Creating an account allows you to participate in chat, follow your
        favorite channels, and broadcast from your own channel.
      </p>
      <FormField
        label="Username"
        {...register("username")}
        className="py-2 px-2 outline-2 w-full"
        autoFocus
      />
      <FormField
        label="Password"
        {...register("password")}
        type="password"
        className="py-2 px-2 outline-2 w-full"
      />
      <FormField
        label="Confirm Password"
        {...register("passwordRepeat")}
        type="password"
        className="py-2 px-2 outline-2 w-full"
      />
      <FormField
        label="Email"
        {...register("email")}
        type="email"
        className="py-2 px-2 outline-2 w-full"
      />
      <p className="text-sm text-center">
        By clicking Sign Up, you are agreeing to twitch-clone's{" "}
        <InlineLink to="https://tosdr.org/en/service/200" external>
          Terms of Service
        </InlineLink>
        .
      </p>
      <SubmitButton className="w-full" value="Sign Up" />
    </form>
  );
};

export default SignupForm;
