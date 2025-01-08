#!/usr/bin/with-contenv bashio

cat /data/options.json

export LASKAKIT_URL="$(bashio::config 'laskaKitURL')"
export IMAGE_TO_CONSOLE=$(bashio::config 'imageToConsole')

echo $LASKAKIT_URL
echo $IMAGE_TO_CONSOLE

bashio::log.info "Starting Homeassistant Add-on LaskaKit data feeder."
pnpm start:prod