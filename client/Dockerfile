# Use official Node.js image as base for building
FROM node:14-alpine AS builder

# Set working directory inside the container
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the client application files
COPY . .

# Build the React app for production
RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s build"]
