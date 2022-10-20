import { FC, KeyboardEventHandler, useEffect, useRef, useState } from "react"
import { CHAT_URL, MAX_CHAT_MESSAGES } from "../../config"
import useSession from "../../hooks/useSession"
import { ChatMessage as Message } from "../../types"
import Input from "../common/Input"
import ChatMessage from "../message/ChatMessage"

const Chat: FC = () => {
  const { session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    wsRef.current = new WebSocket(CHAT_URL)
    wsRef.current.onmessage = (ev) => {
      const newMsg = JSON.parse(ev.data) as Message
      if (typeof newMsg === "string") return
      setMessages((old) => {
        if (old.length >= MAX_CHAT_MESSAGES) old.shift()
        return [...old, newMsg]
      })
    }

    return () => {
      if (wsRef.current) wsRef.current.close()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleChatInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && wsRef.current) {
      const msg = JSON.stringify({
        fromUser: "niku",
        fromUserID: 10,
        toUser: "niku",
        toUserID: 10,
        content: event.currentTarget.value,
      })
      wsRef.current.send(msg)
      event.currentTarget.value = ""
    }
  }

  return (
    <div className="bg-zinc-900 w-80 border-l border-l-zinc-700 flex flex-col">
      <div className="flex flex-row justify-center items-center border-b border-b-zinc-700 p-2 h-12">
        <p className="uppercase font-semibold text-sm">Stream Chat</p>
      </div>
      <div className="flex-1 overflow-scrollbar">
        {messages.map((message) => (
          <ChatMessage key={message.messageId.toString()} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="m-2">
        <Input
          disabled={!session}
          className="w-full p-2"
          placeholder="Send a message"
          onKeyDown={handleChatInput}
        />
      </div>
    </div>
  )
}

export default Chat
