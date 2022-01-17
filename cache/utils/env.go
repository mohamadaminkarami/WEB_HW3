package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Panic(err)
	}
}

func GetEnv(key, fallback string) string {
	LoadEnv()

	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
}
