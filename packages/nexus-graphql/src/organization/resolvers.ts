import {
  Organization,
  Project,
  NexusClient,
  ProjectResponseCommon,
  OrgResponseCommon,
} from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';
import { ApolloContext } from '..';

const resolvers: {
  [key: string]: {
    [key: string]: GraphQLObjectResolver<any, any>;
  };
} = {
  Query: {
    organizations: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<OrgResponseCommon[]> => {
      const data = await nexus.Organization.list();
      return data._results;
    },
    organization: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<any> => {
      if (args.label && typeof args.label === 'string') {
        const org = await nexus.Organization.get(args.label);
        return org;
      }
      Promise.reject(undefined);
    },
  },
  Mutation: {
    createOrganization: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Organization> => {
      if (args.label && typeof args.label === 'string') {
        return nexus.Organization.create(args.label, {
          description: 'made in graphql',
        });
      }
      Promise.reject(undefined);
    },
  },
  Organization: {
    projects: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<ProjectResponseCommon[]> => {
      const data = await nexus.Project.list(parent._label);
      return data._results;
    },
  },
};

export default resolvers;
