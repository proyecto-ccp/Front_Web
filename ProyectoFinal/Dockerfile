FROM node:18-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/cpp-frontend /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
EXPOSE 80