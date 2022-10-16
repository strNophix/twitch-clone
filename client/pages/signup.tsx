import { NextPage } from "next"
import LoginModal from "../components/login/LoginModal"

const SignupPage: NextPage = () => {
  return (
    <div className="bg-neutral-900 w-screen h-screen">
      <LoginModal isOpen={true} defaultPage={1} onClose={() => {}} />
    </div>
  )
}

export default SignupPage
