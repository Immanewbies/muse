# Node.js build stage
FROM node:19.6.0-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
ENV REACT_APP_EC2_API 13.251.17.140:8081
RUN npm install
COPY . .
RUN npm run build

# Nginx production stage
FROM nginx:stable-alpine AS production-stage
ENV REACT_APP_EC2_API 13.251.17.140:8081
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]