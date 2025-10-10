FROM node:22-alpine3.22 AS base


RUN npm install -g bun@latest

RUN adduser -D -H -S node || echo "Log: Usuário já existe, continuando..."
USER node

WORKDIR /app

FROM base AS test

COPY ./package.json ./bun.lock ./

RUN bun i --frozen-lockfile

COPY . .

ENTRYPOINT ["bun", "run", "test"]



FROM base AS build

ARG VITE_BUILD_MODE=prod

COPY ./package.json ./bun.lock ./

RUN bun i --frozen-lockfile

COPY . .

RUN bun run build --mode $VITE_BUILD_MODE

FROM nginx:1.27.5-alpine AS production

COPY --from=build /app/nginx /etc/nginx/conf.d

COPY --from=build /app/dist /usr/share/nginx/html/site

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
