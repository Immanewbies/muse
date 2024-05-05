# Use official Node.js image as base for building
FROM node:14-alpine AS builder

# Set working directory inside the container
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Use Nginx as the web server to serve the built React app
FROM nginx:alpine

# Copy the built React app from the builder stage to Nginx web server
COPY --from=builder /usr/src/app/client/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
