import {
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import { FC, useState } from "react"
import { useLogout } from "../../hooks/useLogout"
import useSession from "../../hooks/useSession"

import Button from "../common/Button"
import Logo from "../common/Logo"
import LoginModal, { LoginModelProps } from "../login/LoginModal"

const NavBar: FC = () => {
  const logout = useLogout()
  const session = useSession((state) => state.session)
  const [modalProps, setModalProps] = useState<LoginModelProps>({
    isOpen: false,
    defaultPage: 0,
  })

  const showLoginTab = () =>
    setModalProps({
      defaultPage: 0,
      isOpen: true,
    })

  const showSignupTab = () =>
    setModalProps({
      defaultPage: 1,
      isOpen: true,
    })

  console.log({ session })
  return (
    <nav className="bg-zinc-800 w-screen font-semibold border-b border-b-black">
      <div className="flex flex-row justify-between items-center h-12 mx-2">
        <div>
          <ul className="flex flex-row space-x-8 items-center">
            <li>
              <Logo className="w-8 h-8" />
            </li>
          </ul>
        </div>
        <div>
          <ul className="justify-end flex flex-row space-x-3 items-center">
            {session ? (
              <>
                <li>
                  <UserIcon className="h-5 w-5 inline-block" />
                </li>
                <li>
                  <Button
                    variant="subtle"
                    className="p-[0.4rem]"
                    onClick={logout}
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 inline-block" />
                  </Button>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
      <LoginModal
        {...modalProps}
        onClose={() => setModalProps((old) => ({ ...old, isOpen: false }))}
      />
    </nav>
  )
}

export default NavBar
