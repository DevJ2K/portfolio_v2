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
EOL

    elif [[ "$target" == "frontend" ]]; then
      cat > "$filepath" <<EOL
NUXT_API_BASE_URL=
EOL
    fi


    echo "✅ $filepath has been created."
  done
done
