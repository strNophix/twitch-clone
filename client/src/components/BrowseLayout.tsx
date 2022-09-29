import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import SideNavChannel from "../components/SideNavChannel";
import { Outlet } from "react-router-dom";
import streamData from "../placeholder/GetStreams";
import { NavLink } from "react-router-dom";

function BrowseLayout() {
  return (
    <div className="font-inter flex flex-col h-screen text-gray-100">
      <NavBar />
      <main className="flex-1 flex flex-row overflow-hidden">
        <div className="bg-neutral-800 w-60 flex flex-col">
          <div className="flex flex-row justify-between p-2 items-center">
            <p className="uppercase font-semibold text-sm">Followed channels</p>
            <Button variant="subtle" className="p-2">
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </div>
          <ul className="flex-1 overflow-scrollbar">
            {streamData.data.map((stream) => (
              <li key={stream.id}>
                <NavLink to={`/${stream.user_login}`}>
                  <SideNavChannel stream={stream} />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default BrowseLayout;
