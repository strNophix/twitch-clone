import "../styles/globals.css"
import type { AppProps } from "next/app"
import useSession from "../hooks/useSession"
import { useEffect } from "react"

function MyApp({ Component, pageProps }: AppProps) {
  const loadSession = useSession((state) => state.load)
  useEffect(() => {
    loadSession()
  }, [loadSession])

  return <Component {...pageProps} />
}

export default MyApp
