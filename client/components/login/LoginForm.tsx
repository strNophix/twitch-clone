import { FC } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import FormField from "../common/form/FormField"
import InlineLink from "../common/InlineLink"
import SubmitButton from "../common/form/SubmitButton"

import * as validation from "../../config/validation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useLogInFlow from "../../hooks/useLogInFlow"
import Input from "../common/Input"

const LogInFormSchema = z.object({
  csrfToken: z.string(),
  password: validation.password,
  email: z.string().email({ message: "Not a valid email address" }).trim(),
})

type LogInFormValues = z.infer<typeof LogInFormSchema>

const formFields = [
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
]

const LoginForm: FC = () => {
  const logInFlow = useLogInFlow()
  const { register, handleSubmit, formState } = useForm<LogInFormValues>({
    resolver: zodResolver(LogInFormSchema),
  })
  const onSubmit: SubmitHandler<LogInFormValues> = (data) =>
    logInFlow.submitData({
      csrf_token: data.csrfToken,
      method: "password",
      identifier: data.email,
      password: data.password,
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {logInFlow.flow && (
        <Input
          hidden={true}
          value={logInFlow.flow.ui.nodes[0].attributes.value}
          {...register("csrfToken")}
        />
      )}
      {formFields.map((field) => (
        <FormField
          key={field.id}
          id={field.id}
          type={field.type}
          label={field.label}
          {...register(field.id as any)}
          className="py-2 px-2 outline-2 w-full"
          bottomElement={
            <p className="text-xs">
              {formState.errors[(field.id as any) || ""]?.message}
            </p>
          }
        />
      ))}
      <SubmitButton className="w-full" value="Log In" />
      <div className="text-center">
        <InlineLink to="#">Trouble logging in?</InlineLink>
      </div>
    </form>
  )
}

export default LoginForm
