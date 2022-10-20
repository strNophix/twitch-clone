export interface ChatMessage {
  messageId: number
  fromUserID: number
  fromUser: string
  toUserID: number
  toUser: string
  content: string
  createdAt: number
}
