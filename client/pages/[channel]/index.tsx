import Button from "../../components/common/Button"
import ChatMessage from "../../components/message/ChatMessage"
import Input from "../../components/common/Input"
import streams from "../../placeholder/GetStreams"
import { NextPage } from "next"
import BrowseLayout from "../../components/layout/BrowseLayout"

const ChannelPage: NextPage = () => {
  const stream = streams.data[1]

  return (
    <BrowseLayout>
      <div className="flex-1 flex flex-row">
        <div className="bg-neutral-900 flex-1 flex flex-col">
          <div className="w-full bg-red-200 flex-1" />
          <div className="flex flex-row p-2 items-center justify-between">
            <div className="flex flex-row items-center space-x-3">
              <span className="w-8 h-8 bg-yellow-300 rounded-full" />
              <span className="font-bold">{stream.user_name}</span>
            </div>
            <div>1:14:32</div>
          </div>
        </div>
        <div className="bg-zinc-900 w-80 border-l border-l-zinc-700 flex flex-col">
          <div className="flex flex-row justify-center items-center border-b border-b-zinc-700 p-2 h-12">
            <p className="uppercase font-semibold text-sm">Stream Chat</p>
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
    </BrowseLayout>
  )
}

export default ChannelPage
