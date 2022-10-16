import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceLoginFlowBody,
} from "@ory/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ory from "../services/ory"
import useSession from "./useSession"

const useLogInFlow = () => {
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
        serviceFlow = await ory.getSelfServiceLoginFlow(String(flowId))
      } else {
        serviceFlow = await ory.initializeSelfServiceLoginFlowForBrowsers()
      }

      setFlow(serviceFlow.data)
    }

    func()
  }, [flowId, router, router.isReady, flow])

  const submitData = async (data: SubmitSelfServiceLoginFlowBody) => {
    await router.push(`/login?flow=${flow?.id}`, undefined, {
      shallow: true,
    })
    ory
      .submitSelfServiceLoginFlow(String(flow?.id), undefined, data)
      .then(async ({ data }) => {
        updateSession(data.session)
        await router.push(flow?.return_to || "/")
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  return { flow, submitData }
}

export default useLogInFlow
