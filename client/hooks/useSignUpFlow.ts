import {
  SelfServiceRegistrationFlow,
  Session,
  SubmitSelfServiceRegistrationFlowBody,
} from "@ory/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ory from "../services/ory"
import useSession from "./useSession"

export const useSignUpFlow = () => {
  const router = useRouter()
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>()
  const { flow: flowId } = router.query
  const updateSession = useSession((state) => state.update)

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
          await ory.initializeSelfServiceRegistrationFlowForBrowsers()
      }

      setFlow(serviceFlow.data)
    }

    func()
  }, [flowId, router, router.isReady, flow])

  const submitData = async (data: SubmitSelfServiceRegistrationFlowBody) => {
    await router.push(`/signup?flow=${flow?.id}`, undefined, {
      shallow: true,
    })
    ory
      .submitSelfServiceRegistrationFlow(String(flow?.id), data)
      .then(async ({ data }) => {
        updateSession(data.session as Session)
        await router.push(flow?.return_to || "/")
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  return { flow, submitData }
}

export default useSignUpFlow
