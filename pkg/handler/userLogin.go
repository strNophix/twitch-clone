package handler

import (
	"errors"
	"twitch-clone/pkg/database"
	"twitch-clone/pkg/jwt"
	"twitch-clone/pkg/models"

	"github.com/gofiber/fiber/v2"
)

type LoginRequest struct {
	Username string `json:"username" validate:"required,min=4,max=32"`
	Password string `json:"password" validate:"required,min=8,max=128"`
}

type LoginResponse struct {
	Token string `json:"access_token"`
}

func Login(ctx *fiber.Ctx) error {
	db := database.Db()
	body := LoginRequest{}

	if err := ctx.BodyParser(&body); err != nil {
		return err
	}

	if err := models.Validate.Struct(body); err != nil {
		return err
	}

	user := new(models.User)
	result := db.Where(&models.User{Login: body.Username, Password: body.Password}).Select("id").First(user)

	if result.Error != nil {
		return errors.New("invalid combination of username and password")
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
