# Use official Node.js image as base
FROM node:14-alpine

# Set working directory inside the container
WORKDIR /usr/src/app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the server application files
COPY . .

# Expose port 8081
EXPOSE 8081

# Command to start the Express server
CMD ["npm", "start"]
