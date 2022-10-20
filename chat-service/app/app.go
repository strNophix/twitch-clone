package app

import (
	"twitch-clone/chat-service/logic"
	"twitch-clone/chat-service/models"
	"twitch-clone/chat-service/repository"
	"twitch-clone/chat-service/repository/scylla"
	service "twitch-clone/chat-service/services"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Run() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	e := echo.New()
	var c repository.ChatRepository = scylla.NewChatRepository()
	var s service.ChatService = logic.NewChatService(c)

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("*", func(c echo.Context) error {
		return s.Subscribe(c.Response().Writer, c.Request())
	})

	e.POST("*", func(c echo.Context) error {
		return s.Publish(c.Request().URL.Path, &models.ChatMessage{
			FromUserID: 0,
			FromUser:   "niku",
			ToUserID:   0,
			ToUser:     "niku",
			Content:    "Welcome",
		})
	})

	e.Logger.Fatal(e.Start(":1323"))
}
