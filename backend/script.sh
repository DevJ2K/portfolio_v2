#!/bin/bash

echo "Running Ollama..."
ollama serve &

echo "Waiting for Ollama..."
while ! curl -s http://localhost:11434/api/version > /dev/null; do
    sleep 0.5
done

echo "Pulling models..."
ollama pull ${OLLAMA_MODEL}

echo "Ollama is ready, running FastAPI..."

exec fastapi dev app.py --host ${HOST} --port ${PORT}
