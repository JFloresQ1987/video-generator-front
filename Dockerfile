FROM node:20.13-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:1.23
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
# COPY --from=build /app/src/dist/$PROJECT_NAME/server /var/www/html
COPY --from=build /app/dist/video-generator-front /var/www/html
CMD ["nginx", "-g", "daemon off;"]




# FROM node:20.13-alpine as builder
# WORKDIR /app
# COPY package.json package.json
# RUN npm install
# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
# COPY . .
# RUN npm run build

# # FROM nginx:1.23.3 as prod
# FROM nginx:stable as prod
# COPY --from=builder /app/dist/video-generator-front/ /usr/share/nginx/html
# EXPOSE 80
# # CMD [ "nginx", "-g", "daemon off;" ]




# FROM node:20.13-alpine as dev-deps
# WORKDIR /app
# COPY package.json package.json
# RUN npm install

# FROM node:20.13-alpine as builder
# WORKDIR /app
# COPY --from=dev-deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# # FROM nginx:1.23.3 as prod
# FROM nginx:stable as prod
# EXPOSE 80
# COPY --from=builder /app/dist/video-generator-front/ /usr/share/nginx/html
# CMD [ "nginx", "-g", "daemon off;" ]