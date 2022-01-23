# build environment
FROM node:14-alpine as build
WORKDIR /app
COPY package.json ./

RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn run build

# production environment
FROM nginx

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80