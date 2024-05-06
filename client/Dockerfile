# Stage 1: Build the React application
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --cache /tmp/npm-cache --verbose

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the app using a lightweight static server
FROM nginx:alpine

# Copy static assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Configure nginx to serve the content
CMD ["nginx", "-g", "daemon off;"]