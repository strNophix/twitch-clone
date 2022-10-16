import { Dialog, Tab } from "@headlessui/react"
import { FC } from "react"
import Logo from "../common/Logo"

import LoginForm from "./LoginForm"
import LoginModalTab from "./LoginModalTab"
import SignupForm from "./SignupForm"

export interface LoginModelProps {
  isOpen: boolean
  onClose?: () => any
  defaultPage?: number
}

const LoginModal: FC<LoginModelProps> = ({
  defaultPage,
  isOpen,
  onClose = (b: boolean) => {},
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="bg-black/80 fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-zinc-900 text-gray-100 w-[420px] rounded-md py-12 px-6">
          <div className="flex flex-row items-center justify-center">
            <Dialog.Title className="text-xl">
              <Logo className="inline w-12 h-12" /> Log in to twitch-clone
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
              <Tab.Panel>
                <LoginForm />
              </Tab.Panel>
              <Tab.Panel>
                <SignupForm />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default LoginModal
