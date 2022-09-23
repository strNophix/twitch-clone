package models

import (
	jwt "github.com/dgrijalva/jwt-go"
)

type Claim struct {
	ID int64 `json:"id,omitempty"`

	jwt.StandardClaims
}
