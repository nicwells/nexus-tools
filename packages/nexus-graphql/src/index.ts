import { ApolloServer, IResolvers } from 'apollo-server';
import { createNexusClient, NexusClient } from '@bbp/nexus-sdk';
import GraphQLJSON from 'graphql-type-json';
import deepmerge from 'deepmerge';
import fetch from 'node-fetch';
require('abort-controller/polyfill');

import typeDefs from './typeDefs';
import { orgsResolvers } from './organization';
import { projectsResolvers } from './project';
import { resourcesResolvers } from './resources';
import { sparqlViewResolvers } from './sparqlview';

const NEXUS_URL =
  process.env.NEXUS_URL || 'http://staging.nexus.ocp.bbp.epfl.ch/v1';

// Combine all resolvers
const resolvers: IResolvers = deepmerge.all<IResolvers>([
  orgsResolvers,
  projectsResolvers,
  resourcesResolvers,
  sparqlViewResolvers,
  { JSON: GraphQLJSON },
]);

export type ApolloContext = {
  nexus: NexusClient;
};

// Setup Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const [_, token] = (req.headers.authorization &&
      req.headers.authorization.split(' ')) || ['none', ''];
    return {
      token,
      nexus: createNexusClient({ uri: NEXUS_URL, token, fetch }),
    };
  },
});

// Start
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
