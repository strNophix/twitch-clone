.PHONY: chat-service

chat-service:
	go build -o ./tmp/main ./cmd/chat-service/main.go