# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# # Set the environment variable EC2_API
# ENV PORT 8081
# ENV SALT 10
# ENV EC2_IPV4 54.201.208.205:3000
# ENV DB_HOST localhost
# ENV DB_USER new
# ENV DB_PWD 123
# ENV DB_DB muse

# Install dependencies
RUN npm install

# Copy the rest of the server application files
COPY . .

# Expose port 8081
EXPOSE 8081

# Command to start the Express server
CMD ["npm", "start"]
