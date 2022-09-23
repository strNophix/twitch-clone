package database

import (
	"log"

	"twitch-clone/pkg/models"

	"github.com/bwmarrin/snowflake"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Dbinstance struct {
	Db        *gorm.DB
	Snowflake *snowflake.Node
}

var DB Dbinstance

// connectDb
func ConnectDb() {
	node, err := snowflake.NewNode(1)
	if err != nil {
		log.Fatal("Failed to setup snowflake generator. \n", err)
	}

	dsn := "host=postgres user=postgres password=postgres dbname=postgres port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database. \n", err)
	}

	log.Println("connected")
	db.Logger = logger.Default.LogMode(logger.Info)

	db.AutoMigrate(&models.User{})

	DB = Dbinstance{
		Db:        db,
		Snowflake: node,
	}
}

func Db() *gorm.DB {
	return DB.Db
}

func GetID() int64 {
	return DB.Snowflake.Generate().Int64()
}
