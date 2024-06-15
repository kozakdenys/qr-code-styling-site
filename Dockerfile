FROM node:16.15.0-stretch-slim as builder

RUN mkdir app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine3.19

COPY --from=builder /app/docs /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

