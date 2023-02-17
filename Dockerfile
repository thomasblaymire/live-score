FROM node:18

RUN apt-get update -y && apt-get upgrade -y

WORKDIR /home/app

COPY api/package.json ./api/package.json
COPY client/package.json ./client/package.json

RUN yarn