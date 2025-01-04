ARG BUILD_FROM
# hadolint ignore=DL3006
FROM $BUILD_FROM
ARG NODE_AUTH_TOKEN
ENV NODE_AUTH_TOKEN=${NODE_AUTH_TOKEN}
LABEL maintainer="radoslav.irha@gmail.com"

ENV LANG C.UTF-8

WORKDIR /home/app

RUN apk add --no-cache                 \
    nodejs=20.18.1 npm=11.0.0       && \
    npm install -g corepack         && \
    corepack enable pnpm

COPY . .

RUN pnpm install
RUN pnpm build

RUN chmod a+x /run.sh

CMD [ "/run.sh" ]