#!/usr/bin/with-contenv bashio
set +u

export IMAGE_TO_CONSOLE=$(bashio::config 'image_to_console')
export LASKAKIT_URL=$(bashio::config 'laskakit_url')

bashio::log.info "Starting Homeassistant Add-on LaskaKit data feeder."
pnpm start:prod