package models

type ChatMessage struct {
	MessageID  int64  `json:"messageId,omitempty"`
	FromUserID int64  `validate:"required" json:"fromUserID"`
	FromUser   string `validate:"required" json:"fromUser"`
	ToUserID   int64  `validate:"required" json:"toUserID"`
	ToUser     string `validate:"required" json:"toUser"`
	Content    string `validate:"required" json:"content"`
	CreatedAt  int64  `json:"createdAt,omitempty"`
}
