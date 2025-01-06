ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base-debian:bookworm
# hadolint ignore=DL3006
FROM $BUILD_FROM AS base

LABEL maintainer="radoslav.irha@gmail.com"

ENV LANG=C.UTF-8

WORKDIR /home/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update                                          && \
    apt-get install -y --no-install-recommends                 \
        curl=7.88.1-10+deb12u8                                 \
        nodejs=20.18.1                                      && \
    apt-get clean                                           && \
    rm -rf /var/lib/apt/lists/*                             && \
    corepack enable pnpm

COPY . .

RUN chmod a+x ./run.sh

CMD [ "./run.sh" ]

FROM base AS prod-deps
# hadolint ignore=DL3016
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc           \
    pnpm install --prod --frozen-lockfile

FROM base AS build
# hadolint ignore=DL3016
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc           \
    pnpm install --frozen-lockfile                          && \
    pnpm run build    

FROM base
COPY --from=prod-deps /home/app/node_modules /home/app/node_modules
COPY --from=build /home/app/dist /home/app/dist
