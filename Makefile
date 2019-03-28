.PHONY: build test clean

ME=`id -u`:`id -g`

dshell:
	@echo "Running a Docker shell... 🐚" 
	@docker-compose run --rm --user ${ME} --entrypoint bash nexus-graphql

install:
	@echo "Installing project's dependencies... 🚀"
	@npm i

build:
	@echo "Building ALL projects... 👷"
	@./node_modules/lerna/cli.js run build

test:
	@echo "Running tests in ALL projects... 🧪"
	@./node_modules/lerna/cli.js run test

lint:
	@echo "Linting ALL projects... ✨"
	@npm run lint

clean:
	@echo "Cleaning ALL projects... 🗑"
	@./node_modules/lerna/cli.js run clean
	@rm -fr node_modules/
