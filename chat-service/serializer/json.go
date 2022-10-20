package serializer

import (
	"encoding/json"
	"twitch-clone/chat-service/models"
	"twitch-clone/chat-service/utils"
)

type JsonMessageSerializer struct{}

func (s *JsonMessageSerializer) Decode(input []byte) (*models.ChatMessage, error) {
	msg := &models.ChatMessage{}
	if err := json.Unmarshal(input, msg); err != nil {
		return nil, err
	}

	if err := utils.Validate.Struct(msg); err != nil {
		return nil, err
	}

	return msg, nil
}

func (s *JsonMessageSerializer) Encode(input *models.ChatMessage) ([]byte, error) {
	msg, err := json.Marshal(input)
	if err != nil {
		return nil, err
	}

	return msg, nil
}
