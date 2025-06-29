#!/bin/bash

environments=("dev" "prod")
targets=("backend" "frontend")

for env in "${environments[@]}"; do
  for target in "${targets[@]}"; do
    filepath="env/.env-${env}-${target}"

    if [[ -f "$filepath" ]]; then
      echo "⚠️  $filepath already exists."
      continue
    fi

    if [[ "$target" == "backend" ]]; then
      cat > "$filepath" <<EOL
MISTRAL_API_KEY=
OLLAMA_MODEL=
EMAIL_RECEIVER=
EMAIL_SENDER=
PASSWORD_SENDER=
API_KEY=
PROXY_STATUS=
DISCORD_WEBHOOK_URL=
EOL

    elif [[ "$target" == "frontend" ]]; then
      cat > "$filepath" <<EOL
NODE_OPTIONS=
NUXT_API_BASE_URL=
API_KEY=
EOL
    fi


    echo "✅ $filepath has been created."
  done
done
