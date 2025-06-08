FROM python:3.13


WORKDIR /app

COPY app/ .
COPY ./requirements.txt .

RUN pip install -r requirements.txt

RUN curl -fsSL https://ollama.com/install.sh | sh

ARG HOST
ARG PORT

ENV HOST=$HOST
ENV PORT=$PORT

EXPOSE $PORT

COPY ./script.sh .
RUN chmod +x script.sh

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["./script.sh"]
