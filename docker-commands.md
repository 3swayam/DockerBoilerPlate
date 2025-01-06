# Docker Setup Guide

This guide provides two methods to set up and run your Docker container. You can either use a `Dockerfile` to automate the process or run individual Docker commands manually.

## Method 1: Using Dockerfile

1. **Create a Dockerfile**  
   A `Dockerfile` contains instructions to build a Docker image.

   ```bash
   docker compose up 
   ```

   By default the file is mostly named 'Dockerfile', in case you want to name differently you can use the below command
   ```bash
   docker-compose -f [DOCKER-COMPOSE-FILE-NAME] up
   ```

## Method 2: Individually Creating Images
2. 
   View all networks
   ```bash
   docker network ls
   ```
   Create A new Network
   ```bash
   docker network create [Network_NAME]
   ```
   Start mongodb
   ```bash
   docker run -d \
   -p 27017:27017 \
    --net [Network_NAME] \
    --name [MONGO_CONTAINER_NAME] \
    -e MONGO_INITDB_ROOT_USERNAME=[ADMIN_NAME] \
    -e MONGO_INITDB_ROOT_PASSWORD=[PASSWORD] \
    mongo
   ```

   Start mongo-express
   ```bash
   docker run -d \
   -p 8081:8081 \
   --network [Network_NAME] \
   --name [MONGO_EXPRESS_CONTAINER_NAME] \
   -e ME_CONFIG_MONGODB_SERVER=[MONGO_CONTAINER_NAME] \
   -e ME_CONFIG_MONGODB_ADMINUSERNAME=[ADMIN_NAME] \
   -e ME_CONFIG_MONGODB_ADMINPASSWORD=[PASSWORD] \
   -e ME_CONFIG_BASICAUTH_USERNAME=[ADMIN_NAME] \
   -e ME_CONFIG_BASICAUTH_PASSWORD=[PASSWORD] \
   mongo-express
   ```

## Create your own image
```bash
docker build -t my-node-app .
```
