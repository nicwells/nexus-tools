FROM node:12-alpine

WORKDIR /opt/app/nexus-socket
COPY package.json /opt/app/nexus-socket
COPY src /opt/app/nexus-socket
RUN yarn
EXPOSE 3000
ENTRYPOINT [ "yarn", "ts-node", "src/index.ts" ]