import { ApolloServer, IResolvers } from 'apollo-server';
import { Nexus } from '@bbp/nexus-sdk';
import GraphQLJSON from 'graphql-type-json';
import deepmerge from 'deepmerge';
import typeDefs from './typeDefs';
import { orgsResolvers } from './organization';
import { projectsResolvers } from './project';
import { resourcesResolvers } from './resources';
import { sparqlViewResolvers } from './sparqlview';

// Combine all resolvers
const resolvers: IResolvers = deepmerge.all<IResolvers>([
  orgsResolvers,
  projectsResolvers,
  resourcesResolvers,
  sparqlViewResolvers,
  { JSON: GraphQLJSON },
]);

// Setup Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const [type, token] = (req.headers.authorization &&
      req.headers.authorization.split(' ')) || ['none', ''];
    return {
      token,
      nexus: new Nexus({
        environment: 'http://dev.nexus.ocp.bbp.epfl.ch/v1',
        token,
      }),
    };
  },
});

// Start
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
