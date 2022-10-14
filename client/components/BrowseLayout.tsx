import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import Button from './Button';
import NavBar from './NavBar';
import SideNavChannel from './SideNavChannel';
import streamData from '../placeholder/GetStreams';
import { NextPage } from 'next';
import Link from 'next/link';

const BrowseLayout: NextPage = ({children}) => {
  return (
    <div className="font-inter flex flex-col h-screen text-gray-100">
      <NavBar />
      <main className="flex-1 flex flex-row overflow-hidden">
        <div className="bg-neutral-800 w-60 flex flex-col">
          <div className="flex flex-row justify-between p-2 items-center">
            <p className="uppercase font-semibold text-sm">Trending channels</p>
            <Button variant="subtle" className="p-2">
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </div>
          <ul className="flex-1 overflow-scrollbar">
            {streamData.data.map((stream) => (
              <li key={stream.id}>
                <Link href={`/${stream.user_login}`} passHref={true}>
                  <SideNavChannel stream={stream} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {children}
      </main>
    </div>
  );
}

export default BrowseLayout;
