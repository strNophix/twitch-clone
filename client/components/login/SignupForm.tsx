import { zodResolver } from "@hookform/resolvers/zod"
import { SelfServiceRegistrationFlow } from "@ory/client"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import ory from "../../services/ory"

import FormField from "../common/form/FormField"
import InlineLink from "../common/InlineLink"
import Input from "../common/Input"
import SubmitButton from "../common/form/SubmitButton"

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,64}$/

const SignupFormSchema = z
  .object({
    csrfToken: z.string(),
    username: z
      .string()
      .trim()
      .min(1, { message: "Username must be at least 1 character long." })
      .max(16, { message: "Username can't be longer than 16 characters.." }),
    password: z
      .string()
      .trim()
      .regex(
        PASSWORD_REGEX,
        "Password must be 8-64 long and must contain a number, uppercase, lowercase and special character.",
      ),
    passwordRepeat: z.string().trim(),
    email: z.string().email({ message: "Not a valid email address" }).trim(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match.",
    path: ["passwordRepeat"],
  })

type SignupFormValues = z.infer<typeof SignupFormSchema>

const formFields = [
  { id: "username", label: "Username", type: "text" },
  { id: "password", label: "Password", type: "password" },
  { id: "passwordRepeat", label: "Confirm Password", type: "password" },
  { id: "email", label: "Email", type: "email" },
]

const SignupForm: FC = () => {
  const router = useRouter()
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>()
  const { flow: flowId, return_to: returnTo } = router.query
  const { register, handleSubmit, formState } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
  })

  useEffect(() => {
    const func = async () => {
      if (!router.isReady || flow) {
        return
      }

      let serviceFlow
      if (flowId) {
        serviceFlow = await ory.getSelfServiceRegistrationFlow(String(flowId))
      } else {
        serviceFlow =
          await ory.initializeSelfServiceRegistrationFlowForBrowsers(
            returnTo ? String(returnTo) : undefined,
          )
      }

      setFlow(serviceFlow.data)
    }

    func()
  }, [flowId, router, router.isReady, returnTo, flow])

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    await router.push(`/signup?flow=${flow?.id}`, undefined, {
      shallow: true,
    })
    try {
      const resp = await ory.submitSelfServiceRegistrationFlow(
        String(flow?.id),
        {
          csrf_token: data.csrfToken,
          method: "password",
          password: data.password,
          traits: {
            email: data.email,
            // username: data.username,
          },
        },
      )
      console.log(resp)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {flow && (
        <Input
          hidden={true}
          value={flow.ui.nodes[0].attributes.value}
          {...register("csrfToken")}
        />
      )}
      <p className="text-sm">
        Creating an account allows you to participate in chat, follow your
        favorite channels, and broadcast from your own channel.
      </p>
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
      <p className="text-sm text-center">
        By clicking Sign Up, you are agreeing to twitch-clone&apos;s{" "}
        <InlineLink to="https://tosdr.org/en/service/200">
          Terms of Service
        </InlineLink>
        .
      </p>
      <SubmitButton className="w-full" value="Sign Up" />
    </form>
  )
}

export default SignupForm
