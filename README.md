# A set of tools for nexus

## [nexus-graphql](./packages/nexus-graphql/README.md)

A GraphQL API wrapper for Nexus

## [nexus-ui](./packages/nexus-ui/README.md)

React UI components for nexus

## [nexus-ui](./packages/nexus-web/README.md)

A web interface for Nexus

## Development

> Note: If you don't have Node.js installed on your machine, you can run a "docker shell" with make dshell from which you'll have a fully working Node.js environment. Make sure you have already installed both [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

- Install dependencies: `make install`
- Run in dev mode: `make start`
- Build: `make build`
- Test: `make test`
- Lint: `make lint`
- Clean: `make clean`

This project is a mono-repo, setup using [Lerna](https://lernajs.io/). All packages can be found under `./packages/`.

Other commands:

`yarn start:storybook` and go to [localhost:6006](http://localhost:6006) - storybook of all packages

Some useful commands:

- `lerna run --scope package-name dev --stream` will run the dev script defined in package-name project
