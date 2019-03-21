.PHONY: build test clean

install:
	@echo "Installing project's dependencies... 🚀"
	@docker-compose run --rm nexus-graphql install

up:
	@echo "Running in dev mode... ‎‍💻"
	@docker-compose up