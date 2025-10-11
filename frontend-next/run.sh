#!/bin/sh

env | grep 'NUXT' > .env
cat .env

npm run build

exec node .output/server/index.mjs
