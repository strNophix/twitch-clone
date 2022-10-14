import { zodResolver } from '@hookform/resolvers/zod';
import { SelfServiceRegistrationFlow } from '@ory/client';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';


import FormField from './FormField';
import InlineLink from './InlineLink';
import SubmitButton from './SubmitButton';

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,64}$/;

const SignupFormSchema = z
  .object({
    username: z.string().trim().min(1).max(16),
    password: z.string().trim().regex(PASSWORD_REGEX),
    passwordRepeat: z.string().trim(),
    email: z.string().email().trim(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
    path: ['passwordRepeat'],
  });

type SignupFormValues = z.infer<typeof SignupFormSchema>;

const SignupForm: FC = () => {
  // const navigate = useNavigate();
  // const { flow: flowId, return_to: returnTo } = useParams<{ flow?: string; return_to?: string }>();
  // const [flow, setFlow] = useState<SelfServiceRegistrationFlow>();
  const { register, handleSubmit } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    console.log({data})
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm">
        Creating an account allows you to participate in chat, follow your favorite channels, and
        broadcast from your own channel.
      </p>
      <FormField
        label="Username"
        {...register('username')}
        className="py-2 px-2 outline-2 w-full"
      />
      <FormField
        label="Password"
        {...register('password')}
        type="password"
        className="py-2 px-2 outline-2 w-full"
      />
      <FormField
        label="Confirm Password"
        {...register('passwordRepeat')}
        type="password"
        className="py-2 px-2 outline-2 w-full"
      />
      <FormField
        label="Email"
        {...register('email')}
        type="email"
        className="py-2 px-2 outline-2 w-full"
      />
      <p className="text-sm text-center">
        By clicking Sign Up, you are agreeing to twitch-clone&apos;s{' '}
        <InlineLink to="https://tosdr.org/en/service/200">
          Terms of Service
        </InlineLink>
        .
      </p>
      <SubmitButton className="w-full" value="Sign Up" />
    </form>
  );
};

export default SignupForm;
