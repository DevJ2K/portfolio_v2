# Define variables

DOCKER_FILE_DEV = docker-compose-dev.yml
DOCKER_FILE_PROD = docker-compose-prod.yml

DOCKER_FILE = $(DOCKER_FILE_DEV)

########################################
########## COLORS
DEF_COLOR = \033[0;39m
GRAY = \033[1;90m
RED = \033[1;91m
GREEN = \033[1;92m
YELLOW = \033[1;93m
BLUE = \033[1;94m
MAGENTA = \033[1;95m
CYAN = \033[1;96m
WHITE = \033[1;97m


# Default target
# help:
# 	@echo "$(MAGENTA)→$(WHITE) $(GREEN)run         $(BLUE)-$(WHITE) Build Docker images and Start Docker containers"
# 	@echo ""
# 	@echo "$(MAGENTA)→$(WHITE) build       $(BLUE)-$(WHITE) Build Docker images"
# 	@echo "$(MAGENTA)→$(WHITE) up          $(BLUE)-$(WHITE) Start Docker containers"
# 	@echo "$(MAGENTA)→$(WHITE) down        $(BLUE)-$(WHITE) Stop Docker containers"
# 	@echo "$(MAGENTA)→$(WHITE) restart     $(BLUE)-$(WHITE) Restart Docker containers"
# 	@echo "$(MAGENTA)→$(WHITE) logs        $(BLUE)-$(WHITE) View Docker logs"
# 	@echo "$(MAGENTA)→$(WHITE) clean       $(BLUE)-$(WHITE) Remove Docker containers, networks, images, and volumes$(DEF_COLOR)"

help:
	@echo "$(MAGENTA)→$(WHITE) $(GREEN)logs        $(BLUE)-$(WHITE) View Docker logs"
	@echo "$(MAGENTA)→$(WHITE) $(GREEN)clean       $(BLUE)-$(WHITE) Remove Docker containers, networks, images, and volumes$(DEF_COLOR)"
	@echo "$(MAGENTA)→$(WHITE) $(GREEN)local       $(BLUE)-$(WHITE) Run local development environment"
# @echo "$(MAGENTA)→$(WHITE) $(GREEN)dev         $(BLUE)-$(WHITE) Run development environment"
	@echo "$(MAGENTA)→$(WHITE) $(GREEN)prod        $(BLUE)-$(WHITE) Run production environment"
	@echo "$(MAGENTA)→$(WHITE) $(GREEN)down-local  $(BLUE)-$(WHITE) Stop local development containers"
# @echo "$(MAGENTA)→$(WHITE) $(GREEN)down-dev    $(BLUE)-$(WHITE) Stop development containers"
	@echo "$(MAGENTA)→$(WHITE) $(GREEN)down-prod   $(BLUE)-$(WHITE) Stop production containers"

# run: build up

# Build Docker images
# build:
# 	@echo "$(BLUE)Building Docker images...$(DEF_COLOR)"
# 	@docker-compose -f $(DOCKER_FILE) build

# up:
# 	@echo "$(YELLOW)Starting Docker containers...$(DEF_COLOR)"
# 	@docker-compose -f $(DOCKER_FILE) up -d


# restart: down up

##############################
# COMMON

down:
	@echo "$(RED)Stopping Docker containers...$(DEF_COLOR)"
	@docker-compose -f docker-compose-$(ENV).yml down

logs:
	@echo "$(GRAY)Viewing logs for services...$(DEF_COLOR)"
	@docker-compose -f docker-compose-$(ENV).yml logs -f

clean:
	@echo "$(RED)Removing Docker containers, networks, images, and volumes...$(DEF_COLOR)"
	@docker-compose -f docker-compose-$(ENV).yml down --rmi all --volumes --remove-orphans

##############################
# ENVIRONMENT
local:
	@echo "$(GREEN)Running local development environment...$(DEF_COLOR)"
	@docker-compose -f $(DOCKER_FILE_DEV) up -d
# @docker-compose -f $(DOCKER_FILE_DEV) up -d backend frontend

prod:
	@echo "$(GREEN)Running production environment...$(DEF_COLOR)"
	@docker-compose -f $(DOCKER_FILE_PROD) build
	@docker-compose -f $(DOCKER_FILE_PROD) up -d

deploy:
	@echo "$(GREEN)Deploying production environment...$(DEF_COLOR)"
	@echo "$(RED)Stopping existing production containers...$(DEF_COLOR)"
	@docker-compose -f $(DOCKER_FILE_PROD) down --rmi all --volumes --remove-orphans
	@echo "$(BLUE)Fetching latest code...$(DEF_COLOR)"
	@git pull
	@echo "$(MAGENTA)Running production environment...$(DEF_COLOR)"
	@docker-compose -f $(DOCKER_FILE_PROD) build
	@docker-compose -f $(DOCKER_FILE_PROD) up -d


##############################
# PHONY
.PHONY: help build up down restart logs clean local dev prod down-prod down-dev down-local

##############################
# CUSTOM OVERRIDES
down-local:
	@$(MAKE) down ENV=dev

down-prod:
	@$(MAKE) down ENV=prod

down-all: down-local down-prod

logs-local:
	@$(MAKE) logs ENV=dev

logs-prod:
	@$(MAKE) logs ENV=prod

clean-local:
	@$(MAKE) clean ENV=dev

clean-prod:
	@$(MAKE) clean ENV=prod

# down-dev:
# 	@$(MAKE) down ENV=dev
