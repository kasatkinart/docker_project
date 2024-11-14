# Docker Flask PostgreSQL Project

This is a simple example project that uses Docker to set up a Flask application with a PostgreSQL database. The application fetches data from the database and displays it as JSON through a REST API.

## Project Structure

- `app.py`: The main Flask application file. Connects to PostgreSQL, fetches data from a specific table, and serves it over an HTTP endpoint.
- `Dockerfile`: Contains the instructions to build the Docker image for the Flask application.
- `docker-compose.yml`: Sets up and links the Flask application and PostgreSQL database containers.

## Getting Started

These instructions will help you set up and run the project on your local machine using Docker.

### Prerequisites

Make sure you have Docker and Docker Compose installed on your system.

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject

2. Build and start the containers:

    ```bash
    docker-compose up --build
   
3. The Flask app should now be running at http://localhost:5001, and PostgreSQL should be accessible on port 5432.

### Usage

To test the API, open a browser or use curl:
   
   ```bash 
   curl http://localhost:5001/data
