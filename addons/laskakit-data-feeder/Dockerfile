ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base-debian:bookworm
# hadolint ignore=DL3006
FROM $BUILD_FROM

RUN --mount=type=secret,id=NODE_AUTH_TOKEN,env=NODE_AUTH_TOKEN

LABEL maintainer="radoslav.irha@gmail.com"

ENV LANG=C.UTF-8

WORKDIR /home/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update                                                                      && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash     && \
    export NVM_DIR="$HOME/.nvm"                                                         && \
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"                                     && \
    nvm install 20.18.1                                                                 && \
    nvm use 20.18.1                                                                     && \
    nvm alias default 20.18.1                                                           && \
    npm install -g corepack@0.30.0                                                      && \
    corepack enable pnpm

COPY . .

# hadolint ignore=DL3016
RUN export NVM_DIR="$HOME/.nvm"                                                         && \
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"                                     && \
    pnpm install                                                                        && \
    pnpm build                                                                          && \
    chmod a+x ./run.sh

CMD [ "./run.sh" ]