package handler

import (
	"twitch-clone/pkg/database"
	"twitch-clone/pkg/jwt"
	"twitch-clone/pkg/models"

	"github.com/gofiber/fiber/v2"
)

type RegisterRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Username string `json:"username" validate:"required,min=4,max=32"`
	Password string `json:"password" validate:"required,min=8,max=128"`
}

type RegisterResponse struct {
	Token string `json:"access_token"`
}

func Register(ctx *fiber.Ctx) error {
	db := database.Db()
	body := RegisterRequest{}

	if err := ctx.BodyParser(&body); err != nil {
		return err
	}

	if err := models.Validate.Struct(body); err != nil {
		return err
	}

	user := models.User{ID: database.GetID(), Login: body.Username, Password: body.Password, Email: body.Email}
	result := db.Create(&user)
	if result.Error != nil {
		return result.Error
	}

	token, err := jwt.GenerateJWT(models.Claim{ID: user.ID})
	if err != nil {
		return err
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     "accessToken",
		Value:    token,
		HTTPOnly: true,
		SameSite: "Strict",
	})

	return ctx.JSON(LoginResponse{Token: token})
}
