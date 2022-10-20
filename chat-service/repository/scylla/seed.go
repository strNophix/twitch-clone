package scylla

import "github.com/scylladb/gocqlx/v2"

func Seed(session gocqlx.Session) error {
	err := session.ExecStmt(`
		CREATE KEYSPACE IF NOT EXISTS chat_service 
		WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`)
	if err != nil {
		return err
	}

	err = session.ExecStmt(`
		CREATE TABLE IF NOT EXISTS chat_service.messages (
			message_id bigint,
			from_user_id bigint,
			from_user text,
			to_user_id bigint,
			to_user text,
			content text,
			created_at timestamp,
			PRIMARY KEY (to_user_id, message_id)
		)`)

	if err != nil {
		return err
	}

	return nil
}
