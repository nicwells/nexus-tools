FROM node:12-alpine AS builder

WORKDIR /tmp/app
COPY package.json /tmp/app
COPY tsconfig.json /tmp/app
COPY tslint.json /tmp/app
COPY lerna.json /tmp/app
COPY packages/nexus-graphql /tmp/app/packages/nexus-graphql
RUN yarn && yarn lerna bootstrap && yarn lerna run build

FROM node:12-alpine

WORKDIR /opt/nexus-graphql
COPY --from=builder /tmp/app/packages/nexus-graphql/package.json /opt/nexus-graphql
COPY --from=builder /tmp/app/packages/nexus-graphql/node_modules /opt/nexus-graphql/node_modules
COPY --from=builder /tmp/app/packages/nexus-graphql/lib /opt/nexus-graphql/lib
EXPOSE 3000
ENTRYPOINT [ "node", "lib/index.js" ]