import { TvIcon, UserIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import Button from "./Button";
import Input from "./Input";

const NavBar: FC = () => {
  return (
    <nav className="bg-zinc-800 w-screen font-semibold">
      <div className="flex flex-row justify-between items-center mx-2">
        <div className="basis-1/4">
          <ul className="flex flex-row space-x-9 items-center">
            <li>
              <TvIcon className="w-6 h-6" />
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
              <Button className="text-sm px-3 py-2 bg-neutral-700">
                Log In
              </Button>
            </li>
            <li>
              <Button className="text-sm px-3 py-2 bg-violet-500">
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
    </nav>
  );
};

export default NavBar;
