.PHONY: build test clean

ME=`id -u`:`id -g`

dshell:
	@echo "Running a Docker shell... 🐚" 
	@docker-compose run --rm --user ${ME} --entrypoint bash nexus-tools

install:
	@echo "Installing project's dependencies... 🚀"
	@yarn && yarn lerna bootstrap

start:
	@echo "starting all the things in dev mode"
	@yarn lerna run dev --stream

build:
	@echo "Building ALL projects... 👷"
	@yarn lerna run build --stream

test:
	@echo "Running tests in ALL projects... 🧪"
	@yarn lerna run test --stream

lint:
	@echo "Linting ALL projects... ✨"
	@yarn lerna run lint --stream

clean:
	@echo "Cleaning ALL projects... 🗑"
	@yarn lerna run clean --stream
	@rm -fr node_modules/
