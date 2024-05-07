# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

ARG PORT
ARG SALT
ARG EC2_IPV4
ARG DB_HOST
ARG DB_USER
ARG DB_PWD
ARG DB_DB

# Set the environment variable EC2_API
ENV PORT $PORT
ENV SALT $SALT
ENV EC2_IPV4 $EC2_IPV4
ENV DB_HOST $DB_HOST
ENV DB_USER $DB_USER
ENV DB_PWD $DB_PWD
ENV DB_DB $DB_DB


# Install dependencies
RUN npm install

# Copy the rest of the server application files
COPY . .

# Expose port 8081
EXPOSE 8081

# Command to start the Express server
CMD ["npm", "start"]
