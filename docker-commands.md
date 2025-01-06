# commands

# View all networks
docker network ls

# Create A new Network
docker network create [Network_NAME]

# Start mongodb
docker run -d \
-p 27017:27017 \
 --net [Network_NAME] \
 --name [MONGO_CONTAINER_NAME] \
 -e MONGO_INITDB_ROOT_USERNAME=[ADMIN_NAME] \
 -e MONGO_INITDB_ROOT_PASSWORD=[PASSWORD] \
 mongo

# Start mongo-express
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


# Another way
docker-compose -f [DOCKER-COMPOSE-FILE-NAME] up 
or
docker compose up 
# depending on the version of docker and file name (default file name :docker-compose.yml)

# Create your own image
docker build -t my-node-app .