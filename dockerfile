FROM node:22-alpine3.22 AS base

WORKDIR /app

RUN npm install -g pnpm@latest

FROM base AS build

ARG VITE_BUILD_MODE=prod

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm run build --mode $VITE_BUILD_MODE

FROM nginx:1.27.5-alpine AS production

COPY --from=build /app/nginx /etc/nginx/conf.d

COPY --from=build /app/dist /usr/share/nginx/html/site

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
