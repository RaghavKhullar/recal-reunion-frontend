FROM node:20-alpine as base

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . .
RUN yarn run build


FROM nginx:1.23.3-alpine as prod

COPY --from=base /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]