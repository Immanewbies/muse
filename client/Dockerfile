# Use an official Node.js runtime as the base image

FROM node:19.6.0-alpine
# Set the working directory within the container
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Receive the EC2_API argument from docker-compose
ARG EC2_API

# Set the environment variable EC2_API
ENV EC2_API $EC2_API

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
EXPOSE 3000

CMD ["npm", "start"]