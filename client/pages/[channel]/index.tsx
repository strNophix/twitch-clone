import ChatMessage from "../../components/message/ChatMessage"
import Input from "../../components/common/Input"
import { NextPage } from "next"
import BrowseLayout from "../../components/layout/BrowseLayout"
import { createRandomMessage } from "../../placeholder/chatMessages"
import Chat from "../../components/chat"

const ChannelPage: NextPage = () => {
  return (
    <BrowseLayout>
      <div className="flex-1 flex flex-row">
        <div className="bg-neutral-900 flex-1 flex flex-col">
          <div className="w-full bg-red-200 flex-1" />
          <div className="flex flex-row p-2 items-center justify-between">
            <div className="flex flex-row items-center space-x-3">
              <span className="w-8 h-8 bg-yellow-300 rounded-full" />
              <span className="font-bold">niku</span>
            </div>
            <div>1:14:32</div>
          </div>
        </div>
        <Chat />
      </div>
    </BrowseLayout>
  )
}

export default ChannelPage
