import { Project, Organization, Resource } from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';

const resolvers: {
  [key: string]: {
    [key: string]: GraphQLObjectResolver<any, any>;
  };
} = {
  Query: {
    projects: async (parent, args): Promise<Project[]> => {
      if (args.orgLabel && typeof args.orgLabel === 'string') {
        const data = await Project.list(args.orgLabel);
        return data.results;
      }
      return [];
    },
    project: async (parent, args): Promise<Project | undefined> => {
      const { orgLabel, projectLabel } = args;
      if (
        orgLabel &&
        projectLabel &&
        typeof orgLabel === 'string' &&
        typeof projectLabel === 'string'
      ) {
        return Project.get(orgLabel, projectLabel);
      }
      Promise.reject(undefined);
    },
  },
  Project: {
    organization: async (parent): Promise<Organization> => {
      return Organization.get(parent.orgLabel);
    },
    resources: async (parent): Promise<Resource[]> => {
      const data = await Resource.list(parent.orgLabel, parent.label);
      return data.results;
    },
  },
};

export default resolvers;
