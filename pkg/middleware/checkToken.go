package middleware

import (
	"context"
	"errors"

	"twitch-clone/pkg/auth"

	"github.com/gofiber/fiber/v2"
)

func CheckSession(c *fiber.Ctx) error {
	cookie := c.Cookies("ory_kratos_session")
	if cookie == "" {
		return errors.New("no session found in cookie")
	}
	_, _, err := auth.AuthClient.V0alpha2Api.ToSession(context.Background()).Cookie(cookie).Execute()
	if err != nil {
		return err
	}
	return nil
}
