import { ArrowRightIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline';

import Button from '../components/Button';
import ChatMessage from '../components/ChatMessage';
import Input from '../components/Input';
import { numFormatter } from '../utils/format';
import streams from '../placeholder/GetStreams';

function ChannelPage() {
  const stream = streams.data[1];

  return (
    <div className="flex-1 flex flex-row">
      <div className="bg-neutral-900 flex-1">
        <div className="w-full h-auto aspect-video bg-red-200 " />
        <div className="flex flex-row p-4 space-x-3">
          <div className="w-20 h-20 bg-yellow-300 rounded-full" />
          <div className="flex-1">
            <div className="flex flex-row justify-between items-center">
              <div className="font-bold">{stream.user_name}</div>
              <div>
                <Button className="h-8 w-10">
                  <HeartIcon className="text-gray-100 h-5 w-5 mx-auto" />
                </Button>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="space-y-1">
                <div className="font-bold">{stream.title}</div>
                <div className="text-violet-400">{stream.game_name}</div>
              </div>
              <div className="flex flex-row items-center text-sm space-x-3">
                <span>
                  <UserIcon className="h-5 w-5 inline-block" />
                  <span>{numFormatter.format(stream.viewer_count)}</span>
                </span>
                <span>{stream.started_at}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 w-80 border-l border-l-zinc-700 flex flex-col">
        <div className="flex flex-row justify-between items-center border-b border-b-zinc-700 p-2">
          <Button variant="subtle" className="p-2">
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
          <p className="uppercase font-semibold text-sm">Stream Chat</p>
          <div className="w-5" />
        </div>
        <div className="flex-1 overflow-scrollbar">
          {new Array(60).fill(0).map((_, i) => (
            <ChatMessage key={i} />
          ))}
        </div>
        <div className="m-2">
          <Input className="w-full p-2" placeholder="Send a message" />
        </div>
      </div>
    </div>
  );
}

export default ChannelPage;
