import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import { createPortal } from "react-dom";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import FormField from "./FormField";
import Button from "./Button";
import InlineLink from "./InlineLink";
import logo from "../assets/images/logo.png";

export interface LoginModelProps {
  isOpen: boolean;
  onClose: () => any;
  defaultPage?: number;
}

const LoginModal: FC<LoginModelProps> = ({ defaultPage, isOpen, onClose }) => {
  return createPortal(
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="bg-black/80 fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-zinc-900 text-gray-100 w-[420px] rounded-md py-12 px-6">
          <div className="flex flex-row items-center justify-center">
            <Dialog.Title className="text-xl">
              <img src={logo} className="inline w-12 h-12" /> Log in to
              twitch-clone
            </Dialog.Title>
          </div>
          <Tab.Group defaultIndex={defaultPage}>
            <Tab.List className="space-x-4 border-b border-b-neutral-100/40 mt-4">
              <Tab>
                {({ selected }) => (
                  <LoginModalTab selected={selected}>Log In</LoginModalTab>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <LoginModalTab selected={selected}>Sign Up</LoginModalTab>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-4">
              <Tab.Panel className="space-y-4">
                <FormField
                  id="login-username"
                  label="Username"
                  className="py-2 px-2 outline-2 w-full"
                  autoFocus
                />
                <FormField
                  id="login-password"
                  label="Password"
                  type="password"
                  className="py-2 px-2 outline-2 w-full"
                  bottomElement={
                    <InlineLink to="#" className="block mt-2">
                      Trouble logging in?
                    </InlineLink>
                  }
                />
                <Button className="bg-violet-500 w-full font-semibold py-2 text-sm">
                  Log In
                </Button>
              </Tab.Panel>
              <Tab.Panel className="space-y-4">
                <p className="text-sm">
                  Creating an account allows you to participate in chat, follow
                  your favorite channels, and broadcast from your own channel.
                </p>
                <FormField
                  id="signup-username"
                  label="Username"
                  className="py-2 px-2 outline-2 w-full"
                  autoFocus
                />
                <FormField
                  id="signup-password"
                  label="Password"
                  type="password"
                  className="py-2 px-2 outline-2 w-full"
                />
                <FormField
                  id="signup-confirm-password"
                  label="Confirm Password"
                  type="password"
                  className="py-2 px-2 outline-2 w-full"
                />
                <FormField
                  id="signup-email"
                  label="Email"
                  type="email"
                  className="py-2 px-2 outline-2 w-full"
                />
                <p className="text-sm text-center">
                  By clicking Sign Up, you are agreeing to twitch-clone's{" "}
                  <InlineLink to="https://tosdr.org/en/service/200" external>
                    Terms of Service
                  </InlineLink>
                  .
                </p>
                <Button className="bg-violet-500 w-full font-semibold py-2 text-sm">
                  Sign Up
                </Button>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.body
  );
};

interface LoginModalTabProps extends React.ComponentPropsWithoutRef<"p"> {
  selected: boolean;
}

const LoginModalTab: FC<LoginModalTabProps> = ({ selected, ...rest }) => {
  return (
    <p
      className={clsx(
        "font-semibold p-1",
        selected && "text-violet-400 border-b-2 border-b-violet-400"
      )}
      {...rest}
    />
  );
};

export default LoginModal;
