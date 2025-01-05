ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base-debian:bookworm
# hadolint ignore=DL3006
FROM $BUILD_FROM

# hadolint ignore
RUN --mount=type=secret,id=toolkit_hub_packages_token,env=NODE_AUTH_TOKEN

LABEL maintainer="radoslav.irha@gmail.com"

ENV LANG=C.UTF-8

WORKDIR /home/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update                                              && \
    apt-get install -y curl                                     && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -   && \
    apt-get install -y nodejs                                   && \
    corepack enable pnpm

COPY . .

# hadolint ignore=DL3016
RUN pnpm install

RUN pnpm build                                                  && \
    chmod a+x ./run.sh

CMD [ "./run.sh" ]