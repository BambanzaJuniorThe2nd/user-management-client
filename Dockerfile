# build stage
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn install

EXPOSE 80

CMD ["yarn", "run", "serve"]