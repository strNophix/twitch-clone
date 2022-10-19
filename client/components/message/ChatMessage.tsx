import { FC } from "react"
import { ChatMessage } from "../../types"

export interface ChatMessageProps {
  message: ChatMessage
}

const ChatMessage: FC<ChatMessageProps> = ({
  message: { author, content },
}) => {
  return (
    <div className="mx-2 p-2 hover:bg-neutral-700 text-sm rounded-md">
      <div className="space-x-1 inline">
        <span className="align-middle">{author}: </span>
      </div>
      <span className="break-all align-middle">{content}</span>
    </div>
  )
}

export default ChatMessage
