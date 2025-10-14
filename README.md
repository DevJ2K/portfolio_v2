# DevJ2K - Portfolio 🧑‍💻

### 🌐 Available at: [devj2k.com](https://devj2k.com)

---

This is the code repository for my personal portfolio website, [devj2k.com](https://devj2k.com). It showcases my projects, skills, and experiences in the field of software development.

> **Note**
>
> It was initially built with `Nuxt`[(see nuxt version)](https://github.com/DevJ2K/portfolio_v2/tree/main/frontend-nuxt), then migrated to `Next.js`[(see next version)](https://github.com/DevJ2K/portfolio_v2/tree/main/frontend-next) for the frontend. The backend is powered by the Python framework `FastAPI` and uses Mistral models for AI functionalities.

# Overview 📸

### Homepage Preview 🖼️
<p align="center">
  <img src="./README/portfolio.png" alt="Portfolio Thumbnail" style="width:100%;" />
</p>

### AI Chatbot with RAG System 🤖
<p align="center">
  <img src="./README/chatbot.png" alt="Portfolio Thumbnail" style="width:100%;" />
</p>

# Stack 🛠️

### Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/), [Python](https://www.python.org/)

- **AI Models**: [Mistral](https://mistral.ai/), [Ollama](https://ollama.com/)

- **Deployment**: [Docker](https://www.docker.com/)

###  Explore the Different Parts of the Project

- [Frontend (Next.js)](https://github.com/DevJ2K/portfolio_v2/tree/main/frontend-next)
- [Frontend (Nuxt.js)](https://github.com/DevJ2K/portfolio_v2/tree/main/frontend-nuxt) - *deprecated*
- [Backend (FastAPI)](https://github.com/DevJ2K/portfolio_v2/tree/main/backend-fastapi)
- [Orchestrator (Docker)](https://github.com/DevJ2K/portfolio_v2/blob/main/docker-compose-dev.yml)

# Installation & Usage 🚀

Follow the steps below to set up and run the project locally:

---

### 1. Clone the repository

```bash
git clone https://github.com/DevJ2K/portfolio_v2.git && cd portfolio_v2
```

---

### 2. Ensure you have [Docker](https://www.docker.com/) installed on your machine.
---
### 3. Generate environment variable files

Run the following script to create the necessary `.env` files:

```bash
chmod +x ./env/create-env.sh && ./env/create-env.sh
```

---
### 4. Configure the environment variables
Fill in the generated `.env` files located in the `env` directory with these values:

`.env-dev-backend`:

```sh
MISTRAL_API_KEY=Your_Mistral_API_Key # https://console.mistral.ai/api-keys
MISTRAL_MODEL=Mistral_model_name # https://docs.mistral.ai/getting-started/models/models_overview (recommended: mistral-small-latest)
OLLAMA_MODEL=hf.co/bartowski/granite-embedding-107m-multilingual-GGUF
EMAIL_RECEIVER=
EMAIL_SENDER=
PASSWORD_SENDER=
API_KEY=J2K-PORTFOLIO-Backend-API-KEY
PROXY_STATUS=disabled
DISCORD_WEBHOOK_URL=
```
> **Notes**:
>
>The empty variables are optional and only used for the contact form feature.
>
> **MISTRAL_API_KEY**, **MISTRAL_MODEL** and **OLLAMA_MODEL** are required for AI functionalities.
>
>Don't change the default value of **OLLAMA_MODEL**.
>
> **API_KEY** secures backend API endpoints when **PROXY_STATUS** is set to `enabled`.


`.env-dev-frontend`:

```sh
API_BASE_URL=http://backend:4000
API_KEY=J2K-PORTFOLIO-Backend-API-KEY
```
> **Note**:
>
> **API_KEY** must match the one defined in `.env-dev-backend`.
>
> **API_BASE_URL** is the URL of the backend service.

---
### 5. Start the application

Use Docker Compose to build and run the application:
```bash
docker-compose -f docker-compose-dev.yml up -d
```
---
### 6. Stop the application

```bash
docker-compose -f docker-compose-dev.yml down
```
---
### 7. Clean up Docker resources

To remove all Docker resources (containers, images, volumes, and orphans) related to this project, run:

```bash
docker-compose -f docker-compose-dev.yml down --rmi all --volumes --remove-orphans
```

