import { NextPage } from "next"

import LoginModal from "../components/login/LoginModal"

const LoginPage: NextPage = () => {
  return (
    <div className="bg-neutral-900 w-screen h-screen">
      <LoginModal isOpen={true} defaultPage={0} onClose={() => {}} />
    </div>
  )
}

export default LoginPage
