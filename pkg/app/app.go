package app

import (
	"fmt"
	"log"
	"os"

	"twitch-clone/pkg/auth"
	"twitch-clone/pkg/database"
	"twitch-clone/pkg/middleware"
	"twitch-clone/pkg/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func Init() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	app := fiber.New(fiber.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}

			return ctx.Status(code).JSON(models.BaseError{Message: err.Error()})
		},
	})
	database.ConnectDb()
	auth.CreateClient()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET, POST, HEAD, PUT,DELETE, PATCH, OPTIONS",
		AllowCredentials: true,
	}))
	app.Use(logger.New())

	api := app.Group("/api")
	v1 := api.Group("/v1")

	test := v1.Group("/test")
	test.Use(middleware.CheckSession)
	test.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("This is a protected route!")
	})

	// Serve React frontend
	app.Static("/", "./dist")
	app.Get("/*", func(ctx *fiber.Ctx) error {
		return ctx.SendFile("./dist/index.html")
	})

	err = app.Listen(":5000")
	if err != nil {
		log.Fatal(err.Error())
	}
}
