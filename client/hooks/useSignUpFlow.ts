import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from "@ory/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ory from "../services/ory"

export const useSignUpFlow = () => {
  const router = useRouter()
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>()
  const { flow: flowId, return_to: returnTo } = router.query

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

  const submitData = async (data: SubmitSelfServiceRegistrationFlowBody) => {
    await router.push(`/signup?flow=${flow?.id}`, undefined, {
      shallow: true,
    })
    try {
      const resp = await ory.submitSelfServiceRegistrationFlow(
        String(flow?.id),
        data,
      )
      // TODO: handle registration
    } catch (e) {
      // TODO: handle errors
    }
  }

  return { flow, submitData }
}

export default useSignUpFlow
