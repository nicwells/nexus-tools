import { ApolloServer, IResolvers } from 'apollo-server';
import { Nexus } from '@bbp/nexus-sdk';
import GraphQLJSON from 'graphql-type-json';
import deepmerge from 'deepmerge';
import typeDefs from './typeDefs';
import schemaDirectives from './schemaDirectives';
import { orgsResolvers } from './organization';
import { projectsResolvers } from './project';
import { resourcesResolvers } from './resources';

// Setup Nexus environment
Nexus.setEnvironment('https://sandbox.bluebrainnexus.io/v1');
// This is just a test, it needs to be set on request time
Nexus.setToken('');

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
  context: ({ req }) => {
    const token = req.headers.authorization;
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
