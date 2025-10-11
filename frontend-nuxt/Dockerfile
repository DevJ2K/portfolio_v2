FROM node:23-slim

WORKDIR /app

COPY app/ .
COPY ./run.sh /scripts/run.sh
RUN chmod +x /scripts/run.sh

RUN npm install -g npm@11.4.2

RUN npm ci


ARG HOST
ARG PORT

ENV HOST=$HOST
ENV PORT=$PORT

EXPOSE $PORT

# ENTRYPOINT ["tail", "-f", "/dev/null"]
ENTRYPOINT [ "/scripts/run.sh" ]
# CMD [ "sh", "-c", "npm run dev -- --host ${HOST} --port ${PORT}" ]
