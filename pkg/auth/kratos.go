package auth

import (
	client "github.com/ory/client-go"
)

var AuthClient *client.APIClient

func CreateClient() {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4443", // Kratos Admin API
		},
	}
	apiClient := client.NewAPIClient(configuration)
	AuthClient = apiClient
}
