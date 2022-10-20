export interface ChatMessage {
  messageId: bigint
  fromUserId: bigint
  fromUser: string
  toUserId: bigint
  toUser: string
  content: string
  createdAt: bigint
}
