import { NextPage } from "next"
import useSession from "../hooks/useSession"

const IndexPage: NextPage = () => {
  const session = useSession()
  return <div>{JSON.stringify(session.session || {})}</div>
}

export default IndexPage
