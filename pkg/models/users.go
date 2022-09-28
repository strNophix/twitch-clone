package models

import (
	"time"
)

type User struct {
	ID       int64  `json:"id,omitempty" gorm:"primaryKey"`
	Login    string `json:"name,omitempty" gorm:"unique"`
	Email    string `json:"email"`
	Password string `json:"password,omitempty"`

	CreatedAt time.Time
	UpdatedAt time.Time
}
