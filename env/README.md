# 🎛️ Configuration des fichiers `.env`

### 📦 Backend - `.env-dev-backend` && `.env-prod-backend`

```ini
# Nom de l'application
APP_NAME=

# 🔑 Clé API Stripe & IDs des produits
STRIPE_KEY=
PRODUCTS_ID=ID1,ID2,...

# 🔥 Identifiants Firebase
FIREBASE_CREDENTIALS=path1/to/firebase/credentials/file,path2/to/firebase/credentials,...

# 🤖 Clé API OpenAI
OPENAI_KEY=
```

---

### 🌐 Frontend - `.env-dev-frontend` && `.env-prod-frontend`

```ini
# 🌍 Base URL de l'API (Ex: http://backend:____ ou http://localhost:____)
NUXT_API_BASE_URL=

# 🔥 Configuration Firebase
NUXT_FIREBASE_API_KEY=
NUXT_FIREBASE_AUTH_DOMAIN=
NUXT_FIREBASE_PROJECT_ID=
NUXT_FIREBASE_STORAGE_BUCKET=
NUXT_FIREBASE_MESSAGING_SENDER_ID=
NUXT_FIREBASE_APP_ID=
NUXT_FIREBASE_MEASUREMENT_ID=
```

---

### ☑️ Deployment - `.env-dev-other`

```ini
# Authtoken
NGROK=
```

### ☑️ Deployment - `.env-prod-other`
```ini
DIGITAL_OCEAN=
```
