FROM node:16.13.1-alpine3.15 as builder
RUN apk add python3 make g++
COPY . /app
WORKDIR /app
RUN npm ci &&\
    npm run build

FROM node:16.13.1-alpine3.15 as runner
COPY --from=builder /app /app
WORKDIR /app

EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]