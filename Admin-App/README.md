# User Service API

## Description

User Service API is the API within the Game Prize System that will carry out different operations; CRUD operations around the users in the system. The User is created by his/her `userId`, `phoneNumber`, `email`, `firstName`, `lastName`, and `password`.
Upon the creation of the user in the system, the additional fields, `isVerified` which is set to false by default and `isActive` will also be added to it with the value set to `true`.

## Technologies Used

The following are the technologies which have been used in this API with their URLs

- Postgres
- Docker: https://www.docker.com/

## Service local development

The service demonstrates different operation of Users (CRUD operation) using Express.

Feel free to modify variables (such as APPLICATION_NAME) so that you can see how each of you can trace your microservices separately.

- To set up the service

Create a `.env` file with at least the following variables as per `.env.example`:

- DATABASE_URL
- TEST_DATABASE_URL

Install required packages

```bash
npm install
```

Start the service:

```bash
npm run dev
```

This script starts the application in the development mode, consult `package.json` to learn more about scripts

- Now you can open your browser and interact with these URLs:

API JSON based web API based on OpenAPI: http://localhost:5000/api-docs/

## Running Tests

The API endpoints have also been tested using the package `mocha` and `chai` to see if the expected responses are the one that are being returned.
Use the following command to run the tests.

Ensure that you have installed all the necessary packages as per `package.json` in environment for testing, and that configuration variables are well set i.e., testing database is set before running the command.

```bash
npm run test
```
