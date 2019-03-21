FROM node:10-alpine as builder

WORKDIR /tmp/nexus-graphql
COPY . /tmp/nexus-graphql
RUN npm ci && npm run build

FROM node:10-alpine
WORKDIR /opt/nexus
COPY --from=builder /tmp/nexus-graphql/node_modules/ /opt/nexus
COPY --from=builder /tmp/nexus-graphql/lib /opt/nexus
EXPOSE 4000
ENTRYPOINT ["node", "index.js"]