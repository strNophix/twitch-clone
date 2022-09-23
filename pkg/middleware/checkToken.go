package middleware

import (
	"twitch-clone/pkg/jwt"

	"github.com/gofiber/fiber/v2"
)

/*CheckToken : Check the validate of the jwt*/
func CheckToken(c *fiber.Ctx) error {
	_, _, _, err := jwt.ProcessJWT(c.Get("Authorization"))
	if err != nil {
		return err
	}

	c.Next()
	return nil
}
