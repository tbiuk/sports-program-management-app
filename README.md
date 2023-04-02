# Sports Program Management App

Welcome to my sports program management app!

## Features

- User registration with email verification and login
- JWT authentication for secure API access
- Role-based authorization for sport and user management
- Fetching of sports class information with filters
- Sports class enrollment and un-enrollment
- Anonymous ratings and comments for sports classes

## Technical Details

This app is built using the following technologies:

- NestJS framework with TypeScript
- MySQL database using Knex.js query builder
- Docker for containerization

## Setting Up the Environment

Before running the app, you need to set up the environment variables. Create a `.env` file in the root directory of the project and include the necessary variables. Refer to the provided `.env.example` file.

**Note:** For EMAIL_USERNAME and EMAIL_PASSWORD, you need to provide a Gmail username and an app password.

## Running the App

To run the app locally on your machine, follow these steps:

1. Clone the repository
2. Ensure Docker and Docker Compose are installed on your machine
3. Navigate to the project directory
4. Run `docker-compose up` to start the application and database containers
5. Open your web browser and navigate to the appropriate local address for the app (e.g., `http://localhost:3000`)

## API Documentation

The API endpoints are documented using Postman. You can access the documentation at the following link: [Sports Program Management API Documentation](https://www.postman.com/tbiuk/workspace/sports-program-management-api/collection/26660517-6fb7bcf2-b932-43d4-9d03-a702514586d5).

**Note:** When accessing protected API routes, you need to add the JWT token received upon login to the Authorization header as a Bearer token.
