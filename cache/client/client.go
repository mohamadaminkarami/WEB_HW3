package main

import (
	"context"
	"flag"
	"google.golang.org/grpc/credentials"
	"log"
	"time"

	pb "cache/grpc"
	"google.golang.org/grpc"
)

var (
	addr = flag.String("addr", "localhost:50051", "the address to connect to")
)

var cert = "certs/cert.pem"

func initClient() (pb.CacheHandlerClient, context.Context) {
	flag.Parse()
	transportCredentials, err := credentials.NewClientTLSFromFile(cert, "")
	if err != nil {
		log.Fatalf("could not load tls cert: %s", err)
	}
	// Set up a connection to the server.
	conn, err := grpc.Dial(*addr, grpc.WithTransportCredentials(transportCredentials))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	//defer conn.Close()
	c := pb.NewCacheHandlerClient(conn)
	// Contact the server and print out its response.
	ctx, _ := context.WithTimeout(context.Background(), time.Second)
	//defer cancel()

	return c, ctx
}

func set(a string, b string) {
	c, ctx := initClient()

	_, err := c.SetKey(ctx, &pb.SetKeyRequest{Key: a, Value: b})
	if err != nil {
		log.Fatalf("Set %s -> %s Faild", a, b)
	}
	log.Printf("Set %s -> %s Successfully", a, b)
}

func get(a string) {
	c, ctx := initClient()

	rg, err := c.GetKey(ctx, &pb.GetKeyRequest{Key: a})
	if err != nil {
		log.Fatalf("Not Found!")
	}
	log.Printf("Value: %s", rg.GetValue())
}

func clear() {
	c, ctx := initClient()

	_, err := c.Clear(ctx, &pb.ClearRequest{})
	if err != nil {
		log.Fatalf("Clear Cache Failed!!")
	}
	log.Println("Successful Clear")
}

func main() {
	//get("1")
	set("1", "1")
	set("2", "2")
	get("1")
	clear()
	get("2")
}
