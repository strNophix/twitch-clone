package app

import (
	"log"

	"twitch-clone/pkg/database"
	"twitch-clone/pkg/handler"
	"twitch-clone/pkg/middleware"
	"twitch-clone/pkg/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

/*Init : set the port,cors,api and then serve the api*/
func Init() {
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

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET, POST, HEAD, PUT,DELETE, PATCH, OPTIONS",
		AllowCredentials: true,
	}))
	app.Use(logger.New())

	api := app.Group("/api")
	v1 := api.Group("/v1")

	auth := v1.Group("/auth")
	auth.Post("login", handler.Login)
	auth.Post("register", handler.Register)

	test := v1.Group("/test", middleware.CheckToken)
	test.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("This is a protected route!")
	})

	// Serve SPA
	app.Static("/", "./dist")
	app.Get("/*", func(ctx *fiber.Ctx) error {
		return ctx.SendFile("./dist/index.html")
	})

	err := app.Listen(":5000")
	if err != nil {
		log.Fatal(err.Error())
	}
}
