package jwt

import (
	"errors"
	"strings"
	"time"

	"twitch-clone/pkg/models"

	jwt "github.com/golang-jwt/jwt"
)

func GenerateJWT(user models.Claim) (string, error) {
	payload := jwt.MapClaims{
		"id":  user.ID,
		"exp": time.Now().Add(time.Hour * 1500).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenStr, err := token.SignedString([]byte(SecretKey))

	if err != nil {
		return tokenStr, err
	}
	return tokenStr, nil
}

func ProcessJWT(token string) (*models.Claim, bool, int64, error) {
	claims := &models.Claim{}

	splitToken := strings.Split(token, "Bearer")

	if len(splitToken) != 2 {
		return claims, false, 0, errors.New("invalid JWT format")
	}

	token = strings.TrimSpace(splitToken[1])
	tkn, err := jwt.ParseWithClaims(token, claims, func(tk *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return claims, false, 0, err
	}

	if !tkn.Valid {
		return claims, false, 0, errors.New("invalid JWT token")
	}

	// TODO: validate whether user exists
	return claims, true, claims.ID, nil
}
