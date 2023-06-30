# Variables
CONTAINER_NAME := mongodb
IMAGE_NAME := mongo
DB_NAME := mydatabase
PORT := 27017

# Build and run MongoDB container
run:
	docker run --name $(CONTAINER_NAME) -p $(PORT):$(PORT) -d $(IMAGE_NAME)

# Stop and remove MongoDB container
stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

# Connect to MongoDB container using the mongo shell
connect:
	docker exec -it $(CONTAINER_NAME) mongo

# Create a MongoDB database
create-db:
	docker exec -it $(CONTAINER_NAME) mongo --eval "use $(DB_NAME)"

# Remove the MongoDB database
remove-db:
	docker exec -it $(CONTAINER_NAME) mongo --eval "db.dropDatabase()"
