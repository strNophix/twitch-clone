import { FC, useEffect, useState } from "react"
import { CHAT_URL } from "../../config"
import { ChatMessage as Message } from "../../types"
import Input from "../common/Input"
import ChatMessage from "../message/ChatMessage"

const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const ws = new WebSocket(CHAT_URL)
    ws.onmessage = (ev) => {
      const newMsg = JSON.parse(ev.data) as Message
      setMessages((old) => [...old, newMsg])
    }
  }, [])

  return (
    <div className="bg-zinc-900 w-80 border-l border-l-zinc-700 flex flex-col">
      <div className="flex flex-row justify-center items-center border-b border-b-zinc-700 p-2 h-12">
        <p className="uppercase font-semibold text-sm">Stream Chat</p>
      </div>
      <div className="flex-1 overflow-scrollbar">
        {messages.map((message) => (
          <ChatMessage key={message.messageId.toString()} message={message} />
        ))}
      </div>
      <div className="m-2">
        <Input className="w-full p-2" placeholder="Send a message" />
      </div>
    </div>
  )
}

export default Chat
