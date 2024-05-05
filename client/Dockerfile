# Use official Node.js image as base for building
FROM node:14-alpine AS builder

# Set working directory inside the container
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm run build

RUN npm install -g serve

COPY . .

EXPOSE 3000

CMD ["serve", "-s build"]
