import { SparqlView, SparqlViewQueryResponse } from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';
import { ApolloContext } from '..';

const resolvers: {
  [key: string]: {
    [key: string]: GraphQLObjectResolver<any, any>;
  };
} = {
  Query: {
    sparqlView: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Object> => {
      const { orgLabel, projectLabel, query } = args;
      let data = null;
      if (
        orgLabel &&
        projectLabel &&
        typeof orgLabel === 'string' &&
        typeof projectLabel === 'string'
      ) {
        if (query && typeof query === 'string') {
          data = await nexus.View.sparqlQuery(
            orgLabel,
            projectLabel,
            encodeURIComponent('nxv:defaultSparqlIndex'),
            query,
          );
        }
      }
      return { data };
    },
  },
};

export default resolvers;
