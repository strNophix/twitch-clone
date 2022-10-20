package scylla

import (
	"os"
	"twitch-clone/chat-service/models"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
)

var messageMetadata = table.Metadata{
	Name:    "chat_service.messages",
	Columns: []string{"message_id", "from_user_id", "from_user", "to_user_id", "to_user", "content", "created_at"},
}

var messageTable = table.New(messageMetadata)

type ChatRepository struct {
	cluster gocql.ClusterConfig
}

func (r *ChatRepository) Store(msg *models.ChatMessage) error {
	session, err := gocqlx.WrapSession(r.cluster.CreateSession())
	if err != nil {
		return err
	}
	defer session.Close()

	q := session.Query(messageTable.Insert()).BindStruct(msg)
	if err := q.ExecRelease(); err != nil {
		return err
	}

	return nil
}

func NewChatRepository() *ChatRepository {
	cluster := gocql.NewCluster(os.Getenv("CHAT_SCYLLA_HOSTS"))

	session, _ := gocqlx.WrapSession(cluster.CreateSession())
	Seed(session)
	session.Close()

	return &ChatRepository{
		cluster: *cluster,
	}
}
