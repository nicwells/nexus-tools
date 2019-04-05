import { ApolloServer, IResolvers } from 'apollo-server';
import { Nexus } from '@bbp/nexus-sdk';
import GraphQLJSON from 'graphql-type-json';
import deepmerge from 'deepmerge';
import typeDefs from './typeDefs';
import schemaDirectives from './schemaDirectives';
import { orgsResolvers } from './organization';
import { projectsResolvers } from './project';
import { resourcesResolvers } from './resources';

// This is just a test, it needs to be set on request time
const token = '';

// Setup Nexus environment
Nexus.setEnvironment('http://dev.nexus.ocp.bbp.epfl.ch/v1');
Nexus.setToken(token);

// Combine all resolvers
const resolvers: IResolvers = deepmerge.all<IResolvers>([
  orgsResolvers,
  projectsResolvers,
  resourcesResolvers,
  { JSON: GraphQLJSON },
]);

// Setup Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: () => {
    // create new nexus instance here
    return {
      token,
    };
  },
});

// Start
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
