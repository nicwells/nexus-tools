FROM node:12-alpine AS builder

WORKDIR /tmp/app
COPY package.json /tmp/app
COPY tsconfig.json /tmp/app
COPY tslint.json /tmp/app
COPY lerna.json /tmp/app
COPY packages/nexus-socket /tmp/app/packages/nexus-socket
RUN yarn && yarn lerna bootstrap && yarn lerna run build

FROM node:12-alpine

WORKDIR /opt/nexus-socket
COPY --from=builder /tmp/app/packages/nexus-socket/package.json /opt/nexus-socket
COPY --from=builder /tmp/app/packages/nexus-socket/node_modules /opt/nexus-socket/node_modules
COPY --from=builder /tmp/app/packages/nexus-socket/lib /opt/nexus-socket/lib
EXPOSE 3000
ENTRYPOINT [ "node", "lib/index.js" ]