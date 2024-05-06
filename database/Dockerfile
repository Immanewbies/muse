# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=123
ENV MYSQL_DATABASE=muse
ENV MYSQL_USER=new
ENV MYSQL_PASSWORD=123

# Copy the SQL file into the container (assumes it's in ./database/)
# COPY ./muse.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306
