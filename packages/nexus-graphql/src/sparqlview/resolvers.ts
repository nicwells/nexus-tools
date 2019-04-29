import { SparqlView } from '@bbp/nexus-sdk';
import { getSparqlView } from '@bbp/nexus-sdk/lib/View/utils';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';

const resolvers: {
  [key: string]: {
    [key: string]: GraphQLObjectResolver<any, any>;
  };
} = {
  Query: {
    sparqlView: async (parent, args, { nexus, token }): Promise<SparqlView> => {
      const { orgLabel, projectLabel, query } = args;
      if (
        orgLabel &&
        projectLabel &&
        typeof orgLabel === 'string' &&
        typeof projectLabel === 'string'
      ) {
        const view: SparqlView = await getSparqlView(orgLabel, projectLabel);
        let data = null;
        if (query && typeof query === 'string') {
          data = view.query(query);
        }
        // @ts-ignore
        view.data = data;
        return view;
      }
      return null;
    },
  },
};

export default resolvers;
