FROM node:20.13-alpine as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20.13-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build as prod

FROM nginx:1.23.3
EXPOSE 80
COPY --from=builder /app/dist/video-generator-front /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]