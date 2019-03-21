import { Resource } from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';

const resolvers: {
  [key: string]: {
    [key: string]: GraphQLObjectResolver<any, any>;
  };
} = {
  Query: {
    resources: async (parent, args): Promise<Resource[]> => {
      if (
        args.orgLabel &&
        args.projectLabel &&
        typeof args.orgLabel === 'string' &&
        typeof args.projectLabel === 'string'
      ) {
        const data = await Resource.list(args.orgLabel, args.projectLabel);
        return data.results;
      }
      return [];
    },
    resource: async (parent, args): Promise<Resource | undefined> => {
      const { orgLabel, projectLabel, schemaId, resourceId } = args;
      if (
        orgLabel &&
        projectLabel &&
        schemaId &&
        resourceId &&
        typeof orgLabel === 'string' &&
        typeof projectLabel === 'string' &&
        typeof schemaId === 'string' &&
        typeof resourceId === 'string'
      ) {
        return Resource.get(orgLabel, projectLabel, schemaId, resourceId);
      }
      Promise.reject(undefined);
    },
  },
};

export default resolvers;
