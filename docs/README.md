# Documentation

## Development

This document describes the process for running this application on your local computer.

### Prerequisites

- node.js > 22.14.0
- pnpm > 9.14.4

### Getting started

Create `.env` and add your PAT for GiHub packages. You'll need to use it before installing like: `NODE_AUTH_TOKEN=XXX pnpm install`

## Docker

### Local build

Create `.npmrc.docker` in root. This is just `.npmrc` with replaced env variable with auth token for private npm packages.

Use following command to build image locally `docker build -t {image}:{tag} --secret id=npmrc,src=.npmrc.docker ./addons/{addon}`.

Create `./addons/{addon}/options.json` representing options passed to addon from Home assistant (declared in config.json[options]).

Use following command to run container locally `docker run {image}:{tag} -v ./addons/{addon}/options.json:/data/options.json`.

Example:

```sh
docker build -t radoslavirha/ha-addon-laskakit-data-feeder:0.0.1 --secret id=npmrc,src=.npmrc.docker ./addons/laskakit-data-feeder
docker run -v ./addons/laskakit-data-feeder/options.json:/data/options.json -p 4000:4000 radoslavirha/ha-addon-laskakit-data-feeder:0.0.1
```
