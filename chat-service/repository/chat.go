package repository

import (
	"twitch-clone/chat-service/models"
)

type ChatRepository interface {
	Store(*models.ChatMessage) error
}
