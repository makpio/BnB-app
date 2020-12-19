
FROM node:13.12.0-alpine
WORKDIR .

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm i
COPY . ./
EXPOSE 3000