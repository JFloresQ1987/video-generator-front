FROM node:20.13-alpine

ENV JQ_VERSION=1.6
RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
RUN cp /tmp/jq-linux64 /usr/bin/jq
RUN chmod +x /usr/bin/jq

WORKDIR /app
COPY . .
# RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json > ./src/config.tmp.json && mv ./src/config.tmp.json ./src/config.json
# RUN jq 'to_entries | map_values({ (.key) : ("${" + .key + "}") }) | reduce .[] as $item ({}; . + $item)' ./src/config.json > ./src/config.tmp.json && mv ./src/config.tmp.json ./src/config.json
# RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/assets/config.json > ./src/assets/config.tmp.json && mv ./src/assets/config.tmp.json ./src/assets/config.json
# RUN jq 'to_entries | map_values({ (.key) : ("${" + .key + "}") }) | reduce .[] as $item ({}; . + $item)' ./src/environments/config.json > ./src/environments/config.tmp.json && mv ./src/environments/config.tmp.json ./src/environments/config.json
RUN npm install && npm run build

FROM nginx:stable
# ENV JSFOLDER=/usr/share/nginx/html/*.js
ENV JSFOLDER=/var/www/app/*.js
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh

# WORKDIR /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
# Angular
COPY --from=0 /app/dist/video-generator-front/browser /var/www/app
# React
# COPY --from=0 /app/build .
# VueJS
# COPY --from=0 /app/dist .
ENTRYPOINT [ "start-nginx.sh" ]

# # FROM node:20.13-alpine as dev-deps
# # ENV JQ_VERSION=1.6
# # RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
# # RUN cp /tmp/jq-linux64 /usr/bin/jq
# # RUN chmod +x /usr/bin/jq
# # WORKDIR /app
# # COPY package.json package.json
# # RUN npm install

# # FROM node:20.13-alpine as builder
# # WORKDIR /app
# # COPY --from=dev-deps /app/node_modules ./node_modules
# # COPY . .
# # RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/environments/config.json > ./src/environments/config.tmp.json && mv ./src/environments/config.tmp.json ./src/environments/config.json
# # RUN npm run build

# FROM node:20.13-alpine

# ENV JQ_VERSION=1.6
# RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
# RUN cp /tmp/jq-linux64 /usr/bin/jq
# RUN chmod +x /usr/bin/jq

# WORKDIR /app
# COPY . .
# # RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json > ./src/config.tmp.json && mv ./src/config.tmp.json ./src/config.json
# # RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json > ./src/config.tmp.json && mv ./src/config.tmp.json ./src/config.json
# # RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/environments/config.json > ./src/environments/config.tmp.json && mv ./src/environments/config.tmp.json ./src/environments/config.json
# RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/assets/config.json > ./src/assets/config.tmp.json && mv ./src/assets/config.tmp.json ./src/assets/config.json
# RUN npm install && npm run build

# # FROM nginx:1.23.3
# # ENV JSFOLDER=/usr/share/nginx/html/*.js
# # COPY ./start-nginx.sh /usr/bin/start-nginx.sh
# # RUN chmod +x /usr/bin/start-nginx.sh

# # WORKDIR /usr/share/nginx/html
# # EXPOSE 4200
# # # Angular
# # COPY --from=0 /app/dist/video-generator-front .
# # # React
# # # COPY --from=0 /app/build .
# # # VueJS
# # # COPY --from=0 /app/dist .
# # ENTRYPOINT [ "start-nginx.sh" ]



# FROM nginx:stable as prod
# ENV JSFOLDER=/usr/share/nginx/html/*.js
# # ENV JSFOLDER=/var/www/app/*.js
# COPY ./start-nginx.sh /usr/bin/start-nginx.sh
# RUN chmod +x /usr/bin/start-nginx.sh

# WORKDIR /usr/share/nginx/html
# # WORKDIR /var/www/app/assets
# # RUN rm /etc/nginx/conf.d/default.conf
# # COPY nginx.conf /etc/nginx/conf.d

# # Angular
# # COPY --from=0 /app/dist/video-generator-front/browser /var/www/app
# # COPY --from=0 /app/dist/video-generator-front/browser /var/www/app
# COPY --from=0 /app/dist/video-generator-front/browser .
# # React
# # COPY --from=0 /app/build .
# # VueJS
# # COPY --from=0 /app/dist .
# ENTRYPOINT [ "start-nginx.sh" ]



# # FROM nginx:stable as prod
# # # EXPOSE 4200
# # RUN rm /etc/nginx/conf.d/default.conf
# # COPY nginx.conf /etc/nginx/conf.d
# # # COPY --from=build /app/src/dist/$PROJECT_NAME/server /var/www/html
# # COPY --from=0 /app/dist/video-generator-front/browser /var/www/app
# # CMD ["nginx", "-g", "daemon off;"]










# # # FROM nginx:1.23.3 as prod
# # FROM nginx:stable as prod
# # EXPOSE 4200
# # COPY --from=builder /app/dist/video-generator-front/ /usr/share/nginx/html
# # CMD [ "nginx", "-g", "daemon off;" ]

# # # FROM node:20.13-alpine as dev-deps
# # # WORKDIR /app
# # # COPY package.json package.json
# # # RUN npm install

# # # FROM node:20.13-alpine as builder
# # # WORKDIR /app
# # # COPY --from=dev-deps /app/node_modules ./node_modules
# # # COPY . .
# # # RUN npm run build


# # FROM node:20.13-alpine as dev-deps

# # ENV JQ_VERSION=1.6
# # RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
# # RUN cp /tmp/jq-linux64 /usr/bin/jq
# # RUN chmod +x /usr/bin/jq

# # WORKDIR /app
# # COPY package.json package.json
# # RUN npm install

# # # WORKDIR /app
# # # COPY . .
# # # RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/environments/config.json > ./src/environments/config.tmp.json && mv ./src/environments/config.tmp.json ./src/environments/config.json
# # # RUN npm install && npm run build

# # FROM node:20.13-alpine as builder
# # WORKDIR /app
# # COPY --from=dev-deps /app/node_modules ./node_modules
# # COPY . .
# # RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/environments/config.json > ./src/environments/config.tmp.json && mv ./src/environments/config.tmp.json ./src/environments/config.json
# # RUN npm run build

# # FROM nginx:1.23.3
# # ENV JSFOLDER=/usr/share/nginx/html/*.js
# # COPY ./start-nginx.sh /usr/bin/start-nginx.sh
# # RUN chmod +x /usr/bin/start-nginx.sh

# # WORKDIR /usr/share/nginx/html
# # # Angular
# # COPY --from=0 /app/dist/video-generator-front .
# # # React
# # # COPY --from=0 /app/build .
# # # VueJS
# # # COPY --from=0 /app/dist .
# # ENTRYPOINT [ "start-nginx.sh" ]

# # # FROM node:20.13-alpine as build
# # # WORKDIR /app
# # # COPY package*.json ./
# # # RUN npm ci
# # # COPY . ./
# # # # RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/environments/config.json > ./src/environments/config.tmp.json && mv ./src/environments/config.tmp.json ./src/environments/config.json
# # # RUN npm run build

# # # FROM nginx:1.23
# # # # EXPOSE 4200
# # # RUN rm /etc/nginx/conf.d/default.conf
# # # COPY nginx.conf /etc/nginx/conf.d
# # # # COPY --from=build /app/src/dist/$PROJECT_NAME/server /var/www/html
# # # COPY --from=build /app/dist/video-generator-front /var/www/html
# # # CMD ["nginx", "-g", "daemon off;"]




# # # FROM node:20.13-alpine as builder
# # # WORKDIR /app
# # # COPY package.json package.json
# # # RUN npm install
# # # RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
# # # COPY . .
# # # RUN npm run build

# # # # FROM nginx:1.23.3 as prod
# # # FROM nginx:stable as prod
# # # COPY --from=builder /app/dist/video-generator-front/ /usr/share/nginx/html
# # # EXPOSE 80
# # # # CMD [ "nginx", "-g", "daemon off;" ]




# # # FROM node:20.13-alpine as dev-deps
# # # WORKDIR /app
# # # COPY package.json package.json
# # # RUN npm install

# # # FROM node:20.13-alpine as builder
# # # WORKDIR /app
# # # COPY --from=dev-deps /app/node_modules ./node_modules
# # # COPY . .
# # # RUN npm run build

# # # # FROM nginx:1.23.3 as prod
# # # FROM nginx:stable as prod
# # # EXPOSE 80
# # # COPY --from=builder /app/dist/video-generator-front/ /usr/share/nginx/html
# # # CMD [ "nginx", "-g", "daemon off;" ]