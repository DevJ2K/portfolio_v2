#!/bin/sh

touch .env
env | grep 'API_BASE_URL' >> .env
env | grep 'API_KEY' >> .env

npm run build

exec npm run start
