import { Project, Organization, Resource, SparqlView } from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';
import { getSparqlView } from '@bbp/nexus-sdk/lib/View/utils';

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
  Mutation: {
    createProject: async (parent, args): Promise<Project> => {
      const { orgLabel, projectLabel } = args;
      if (
        orgLabel &&
        projectLabel &&
        typeof orgLabel === 'string' &&
        typeof projectLabel === 'string'
      ) {
        return Project.create(orgLabel, projectLabel, {
          description: 'made in graphql',
        });
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
    sparqlView: async (parent, args): Promise<SparqlView> => {
      const view = await getSparqlView(parent.orgLabel, parent.label);
      let data = null;
      if (args.query && typeof args.query === 'string') {
        data = view.query(args.query);
      }
      // @ts-ignore
      view.data = data;
      return view;
    },
  },
};

export default resolvers;
