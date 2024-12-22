ARG BUILD_FROM
FROM $BUILD_FROM

LABEL maintainer="radoslav.irha@gmail.com"

ENV LANG C.UTF-8

WORKDIR /home/app

RUN apk add --no-cache \
    nodejs npm

RUN npm install -g corepack
RUN corepack enable pnpm

COPY . .

RUN pnpm install
RUN pnpm build

RUN chmod a+x /run.sh

CMD [ "/run.sh" ]