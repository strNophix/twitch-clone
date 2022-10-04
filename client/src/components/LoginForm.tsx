import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import FormField from "./FormField";
import InlineLink from "./InlineLink";
import SubmitButton from "./SubmitButton";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: FC = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Username"
        className="py-2 px-2 outline-2 w-full"
        {...register("username")}
      />
      <FormField
        label="Password"
        type="password"
        {...register("password")}
        className="py-2 px-2 outline-2 w-full"
        bottomElement={
          <InlineLink to="#" className="block mt-2">
            Trouble logging in?
          </InlineLink>
        }
      />
      <SubmitButton className="w-full" value="Log In" />
    </form>
  );
};

export default LoginForm;
