import { FC } from "react";

import LoginModal from "../components/LoginModal";

const LoginPage: FC = () => {
  return (
    <div className="bg-neutral-900 w-screen h-screen">
      <LoginModal isOpen={true} defaultPage={0} onClose={() => {}} />
    </div>
  );
};

export default LoginPage;
