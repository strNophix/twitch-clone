package service

import (
	"net/http"
	"twitch-clone/chat-service/models"
)

type ChatService interface {
	Subscribe(http.ResponseWriter, *http.Request) error
	Publish(string, *models.ChatMessage) error
}
