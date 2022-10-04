import { FC } from "react";

import { numFormatter } from "../lib/format";
import { Stream } from "../types";

interface SideNavChannelProps {
  stream: Stream;
}

const SideNavChannel: FC<SideNavChannelProps> = ({ stream }) => {
  return (
    <div className="flex flex-row px-3 py-2 text-sm leading-4 space-x-2 hover:bg-neutral-700/40 cursor-pointer">
      <img
        className="rounded-full w-8 h-8"
        src={stream.thumbnail_url}
        alt="avatar"
      />
      <div className="flex flex-col flex-1">
        <div className="flex flex-row justify-between">
          <div className="font-bold">{stream.user_name}</div>
          <div className="space-x-1 flex flex-row items-center">
            <div className="w-2 h-2 bg-red-600 rounded-full inline-block" />
            <span>{numFormatter.format(stream.viewer_count)}</span>
          </div>
        </div>
        <div className="text-gray-300">{stream.game_name}</div>
      </div>
    </div>
  );
};

export default SideNavChannel;
