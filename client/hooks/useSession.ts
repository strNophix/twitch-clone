import create from "zustand"

import { Session } from "@ory/client"
import ory from "../services/ory"
import { AxiosError } from "axios"

export interface SessionState {
  session?: Session

  load: () => void
  update: (data: Session) => void
  drop: () => void
}
const useSession = create<SessionState>((set) => ({
  session: undefined,

  load: () => {
    ory
      .toSession()
      .then(({ data }) => {
        set({ session: data })
      })
      .catch((err: AxiosError) => {})
  },
  update: (session) => set({ session }),
  drop: () => {
    set({ session: undefined })
  },
}))

export default useSession
