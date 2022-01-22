FROM golang:alpine

WORKDIR /go/src/app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o /cache

EXPOSE 50051

CMD [ "/cache" ]