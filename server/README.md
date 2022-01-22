## Introduction
  server side.

## Installation

After cloning project, you need to add .env file next to package.json:
```
// .env file
NODE_ENV= // example: "DEVELOPMENT"

PORT= // example: 3000 

DB_DIALECT= // example: "postgres"
DB_NAME= // example: "webhw3"
DB_HOST= // example: "localhost"
DB_PORT= // example: 5432
DB_PASSWORD= // example: "yourpassword"
DB_USERNAME= // example: "mohamadamin"
JWT_SECRET_KEY= // example: "secret"
TOKEN_EXPIRATION_TIME= // example: "2d"
MAXIMUM_REQUEST_PER_MINUTE= // example: 100
REDIS_PORT= // example: 6379
REDIS_HOST= // example: "localhost"

```

## Running project(Prodution mode)

After cloning project, Run following commands:

```
// using npm
$ npm install
$ npm migrate
$ npm start

// using yarn
$ yarn install
$ yarn migrate
$ yarn start
```

## Running project(Development mode)

After cloning project, Run following commands:

```
// using npm
$ npm install
$ npm migrate
$ npm dev

// using yarn
$ yarn install
$ yarn migrate
$ yarn dev
```

## Routes
It provides following routes:

### POST /user/register

#### request body:
```json
{
    "username": "mohamdamin",
    "password": "1234"
}
```
#### responses:
```json
{
    "errors": [
        "username has been already taken!"
    ]
}
```

```json
{
    "message": "you have logged in successfully", 
    "token": "secret token"
}
```

### POST /user/login

#### request body:
```json
{
    "username": "mohamdamin",
    "password": "1234"
}
```
#### responses:
```json
{
    "errors": [
        "username and password does not match!"
    ]
}
```

```json
{
    "message": "you have logged in successfully",
    "token": "secret token"
}
```
### GET /notes
Authorization in header must be provided.

#### responses:

```json
{
    "errors": [
        "Token is not provided"
    ]
}
```
```json
{
    "errors": [
        "Invalid Token"
    ]
}
```

```json
[
    {
        "id": 1,
        "title": "first title",
        "detail": "first note",
        "createdAt": "2022-01-19T10:43:28.369Z",
        "updatedAt": "2022-01-19T10:43:28.369Z",
        "authorId": 2
    },
    ...
]
```

### GET /notes/:noteId
Authorization in header must be provided.
#### responses:
```json
{
    "errors": [
        "Token is not provided"
    ]
}
```
```json
{
    "errors": [
        "Invalid Token"
    ]
}
```

```json
{
    "errors": [
        "you have no permission to access data!"
    ]
}
```

```json
{
    "errors": [
        "note with id x not found!"
    ]
}
```

```json
{
    "id": 2,
    "title": "second title",
    "detail": "second note",
    "createdAt": "2022-01-19T10:45:03.509Z",
    "updatedAt": "2022-01-19T10:45:03.509Z",
    "authorId": 2
}
```

### POST /notes/new

Authorization in header must be provided.

#### request body: 
```json 
{
    "title": "second title",
    "detail": "second note"
}
```

#### responses:
```json
{
    "errors": [
        "Token is not provided"
    ]
}
```
```json
{
    "errors": [
        "Invalid Token"
    ]
}
```

```json
{
    "id": 2,
    "title": "second title",
    "detail": "second note",
    "authorId": 2,
    "updatedAt": "2022-01-19T10:45:03.509Z",
    "createdAt": "2022-01-19T10:45:03.509Z"
}
```

### PUT /notes/:noteId

Authorization in header must be provided.

#### request body: 
```json 
{
    "title": "second title", // not required(if data changed)
    "detail": "second note" // note requried(if data chenged)
}
```

#### responses:
```json
{
    "errors": [
        "Token is not provided"
    ]
}
```

```json
{
    "errors": [
        "note with id x not found!"
    ]
}
```

```json
{
    "id": 2,
    "title": "second title",
    "detail": "second note",
    "authorId": 2,
    "updatedAt": "2022-01-19T10:45:03.509Z",
    "createdAt": "2022-01-19T10:45:03.509Z"
}
```

### DELETE /notes/:noteId

Authorization in header must be provided.

#### responses:
```json
{
    "errors": [
        "Token is not provided"
    ]
}
```
```json
{
    "errors": [
        "Invalid Token"
    ]
}
```

```json
{
    "errors": [
        "note with id x not found!"
    ]
}
```
or No Content (204)
