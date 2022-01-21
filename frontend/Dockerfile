FROM node:16.13.1-alpine3.15 AS builder
COPY . .
RUN npm ci &&\
    npm run build

FROM nginx:1.21.5-alpine AS runner

COPY --from=builder /build /build
COPY nginx/nginx.conf /etc/nginx

EXPOSE 3000