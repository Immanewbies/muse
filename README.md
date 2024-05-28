# Muse Music Application
This is final project from CS402/403: Special Projects 2 (2/2566)

## Prerequisites
* Docker
* Docker Compose

## Installation
### Install Docker & Docker Compose
##### Windows
* You can install Docker Desktop on Windows by follow instruction https://docs.docker.com/desktop/install/windows-install/
##### Linux (Ubuntu)
* Update Package Lists
```shell
sudo apt update
```
* Install Docker
```shell
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo groupadd docker          
sudo usermod -aG docker $USER #change $user to your user
newgrp docker                 
```
* Install Docker Compose
```shell
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
* (If don't have curl)
```shell
sudo apt install curl
```
### Clone this projects
```shell
git clone https://github.com/Immanewbies/muse.git
```
### Change Directory to Docker
```shell
cd muse/docker
```
### Run Docker Compose
```shell
docker compose up --build -d
```
#### Waiting after Docker get started for 1 minute 
#### Enjoy projects

## Note
* if you can't use when docker started because container mysql is start slow than server, and then server can't find database when docker just started


