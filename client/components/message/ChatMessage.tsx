import { FC } from "react"
import { ChatMessage } from "../../types"

export interface ChatMessageProps {
  message: ChatMessage
}

const ChatMessage: FC<ChatMessageProps> = ({
  message: { fromUser, content },
}) => {
  return (
    <div className="mx-2 p-[0.4rem] hover:bg-neutral-700 text-xs rounded-md">
      <div className="space-x-1 inline">
        <span className="align-middle">{fromUser}: </span>
      </div>
      <span className="break-all align-middle">{content}</span>
    </div>
  )
}

export default ChatMessage
