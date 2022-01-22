FROM node:14-alpine
WORKDIR /app

COPY ./package.json package.json

RUN yarn install --production

COPY . .

RUN yarn migrate

EXPOSE 3000

CMD [ "yarn", "start" ]