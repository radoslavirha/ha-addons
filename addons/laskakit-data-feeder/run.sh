#!/usr/bin/env bashio

# cat /data/options.json

export LASKAKIT_URL="$(bashio::config 'laskakit_url')"
export IMAGE_TO_CONSOLE=$(bashio::config 'image_to_console')

echo $LASKAKIT_URL
echo $IMAGE_TO_CONSOLE

bashio::log.info "Starting Homeassistant Add-on LaskaKit data feeder."
pnpm start:prod