import { FC } from "react";
import ChatBadge from "./ChatBadge";

const ChatMessage: FC = () => {
  return (
    <p className="mx-2 p-2 hover:bg-neutral-700 text-sm rounded-md">
      <div className="space-x-1 inline">
        <ChatBadge />
        <ChatBadge />
        <span className="align-middle">Username</span>
      </div>
      <span className="align-middle">: </span>
      <span className="break-all align-middle">
        <img
          src="https://cdn.7tv.app/emote/60afbe0599923bbe7fe9bae1/2x"
          className="inline w-7 h-7"
        />
      </span>
    </p>
  );
};

export default ChatMessage;
