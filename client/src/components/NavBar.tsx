import { TvIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import Input from "./Input";

const NavBar: FC = () => {
  return (
    <nav className="bg-zinc-800 w-screen font-semibold">
      <div className="flex flex-row justify-between items-center mx-2">
        <div className="basis-1/4">
          <ul className="flex flex-row space-x-3 items-center">
            <li>
              <TvIcon className="w-6 h-6" />
            </li>
            <li>Following</li>
            <li>Browse</li>
          </ul>
        </div>
        <div className="basis-2/4">
          <div className="flex flex-row space-x-3 items-center justify-center">
            <Input className=" w-72 my-2 p-2" placeholder="Search" />
          </div>
        </div>
        <div className="basis-1/4">
          <ul className="justify-end flex flex-row space-x-3 items-center">
            <li>Hello</li>
            <li>
              <div className="w-8 h-8 rounded-full bg-yellow-300" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
