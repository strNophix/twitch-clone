package logic

import (
	"encoding/json"
	"net/http"
	"time"
	"twitch-clone/chat-service/models"
	"twitch-clone/chat-service/repository"
	"twitch-clone/chat-service/serializer"

	"github.com/bwmarrin/snowflake"
	"github.com/olahol/melody"
)

type chatService struct {
	ChatRepo      repository.ChatRepository
	Melody        melody.Melody
	MsgSerializer serializer.JsonMessageSerializer
	Snowflake     snowflake.Node
}

func NewChatService(chatRepo repository.ChatRepository) *chatService {
	flakeGen, err := snowflake.NewNode(0)
	if err != nil {
		panic(err)
	}

	c := &chatService{
		ChatRepo:      chatRepo,
		Melody:        *melody.New(),
		MsgSerializer: serializer.JsonMessageSerializer{},
		Snowflake:     *flakeGen,
	}

	c.Melody.HandleMessage(func(s *melody.Session, b []byte) {
		msg, err := c.MsgSerializer.Decode(b)
		if err != nil {
			bytes, _ := json.Marshal(err.Error())
			s.Write(bytes)
			return
		}
		c.Publish(s.Request.URL.Path, msg)
	})

	return c
}

func (c *chatService) Subscribe(w http.ResponseWriter, r *http.Request) error {
	return c.Melody.HandleRequest(w, r)
}

func (c *chatService) Publish(namespace string, msg *models.ChatMessage) error {
	msg.MessageID = c.Snowflake.Generate().Int64()
	msg.CreatedAt = time.Now().Unix()

	rawMsg, err := c.MsgSerializer.Encode(msg)
	if err != nil {
		return err
	}

	err = c.Melody.BroadcastFilter(rawMsg, func(q *melody.Session) bool {
		return q.Request.URL.Path == namespace
	})
	if err != nil {
		return err
	}

	err = c.ChatRepo.Store(msg)
	return err
}
