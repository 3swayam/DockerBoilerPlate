FROM node:18-alpine

# Set environment variables
ENV NODE_VERSION=18.20.5 \
    MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=12345

# Create app directory
RUN mkdir -p /home/app

# Copy application files into the container
COPY . /home/app

# Set the working directory
WORKDIR /home/app

# Run the app
CMD ["node", "index.js"]