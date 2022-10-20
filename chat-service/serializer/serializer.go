package serializer

import "twitch-clone/chat-service/models"

type MessageSerializer interface {
	Decode(input []byte) (*models.ChatMessage, error)
	Encode(input *models.ChatMessage) ([]byte, error)
}
