import { FC } from "react";
import LoginModal from "../components/LoginModal";

const SignupPage: FC = () => {
  return (
    <div className="bg-neutral-900 w-screen h-screen">
      <LoginModal isOpen={true} defaultPage={1} onClose={() => {}} />
    </div>
  );
};

export default SignupPage;
