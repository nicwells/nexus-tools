import { Organization, PaginatedList, Project } from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';

const resolvers: {
  [key: string]: {
    [key: string]: GraphQLObjectResolver<any, any>;
  };
} = {
  Query: {
    organizations: async (): Promise<Organization[]> => {
      const data = await Organization.list();
      return data.results;
    },
    organization: async (parent, args): Promise<any> => {
      if (args.label && typeof args.label === 'string') {
        const org = await Organization.get(args.label);
        return {
          id: org.id,
          context: org.context,
          deprecated: org.deprecated,
          label: org.label,
          rev: org.rev,
          type: org.type,
          uuid: org.uuid,
        };
      }
      Promise.reject(undefined);
    },
  },
  Organization: {
    projects: async (parent, args, context): Promise<Project[]> => {
      const data = await Project.list(parent.label);
      return data.results;
    },
  },
};

export default resolvers;
