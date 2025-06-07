FROM python:3.13-alpine

WORKDIR /app

COPY app/ .

RUN pip install -r requirements.txt

ARG HOST
ARG PORT

ENV HOST=$HOST
ENV PORT=$PORT

EXPOSE $PORT

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD [ "sh", "-c", "fastapi dev app.py --host ${HOST} --port ${PORT}" ]
