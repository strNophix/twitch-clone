import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { useState, useEffect, DependencyList } from "react"

import ory from "../services/ory"
import useSession from "./useSession"

export function useLogout(deps?: DependencyList) {
  const session = useSession()
  const [logoutToken, setLogoutToken] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    ory
      .createSelfServiceLogoutFlowUrlForBrowsers()
      .then(({ data }) => {
        setLogoutToken(data.logout_token)
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 401:
            return
        }

        return Promise.reject(err)
      })
  }, deps)

  return () => {
    if (logoutToken) {
      session.drop()
      ory
        .submitSelfServiceLogoutFlow(logoutToken)
        .then(() => router.push("/"))
        .then(() => router.reload())
    }
  }
}
