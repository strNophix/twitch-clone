import { UserIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";

import logo from "../assets/images/logo.png";

import Button from "./Button";
import Input from "./Input";
import LoginModal from "./LoginModal";

const NavBar: FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showTab, setShowTab] = useState(0);

  const showLoginTab = () => {
    setShowTab(0);
    setShowLogin(true);
  };

  const showSignupTab = () => {
    setShowTab(1);
    setShowLogin(true);
  };

  return (
    <nav className="bg-zinc-800 w-screen font-semibold border-b border-b-black">
      <div className="flex flex-row justify-between items-center mx-2">
        <div className="basis-1/4">
          <ul className="flex flex-row space-x-8 items-center">
            <li>
              <img src={logo} className="w-8 h-8" alt="logo" />
            </li>
            <li>
              <p className="text-lg">Browse</p>
            </li>
          </ul>
        </div>
        <div className="basis-2/4">
          <div className="flex flex-row space-x-3 items-center justify-center">
            <Input className=" w-72 my-2 p-2" placeholder="Search" />
          </div>
        </div>
        <div className="basis-1/4">
          <ul className="justify-end flex flex-row space-x-3 items-center">
            <li>
              <Button
                className="text-sm px-3 py-2 bg-neutral-700"
                onClick={showLoginTab}
              >
                Log In
              </Button>
            </li>
            <li>
              <Button
                className="text-sm px-3 py-2 bg-violet-500"
                onClick={showSignupTab}
              >
                Sign Up
              </Button>
            </li>
            <li>
              <Button variant="subtle" className="p-1">
                <UserIcon className="h-5 w-5 inline-block" />
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <LoginModal
        isOpen={showLogin}
        defaultPage={showTab}
        onClose={() => setShowLogin(false)}
      />
    </nav>
  );
};

export default NavBar;
