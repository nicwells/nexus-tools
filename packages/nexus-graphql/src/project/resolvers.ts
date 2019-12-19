import {
  Project,
  Organization,
  Resource,
  ProjectResponseCommon,
  SparqlViewQueryResponse,
} from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';
import { ApolloContext } from '..';

const resolvers: {
  [key: string]: {
    [key: string]: GraphQLObjectResolver<any, any>;
  };
} = {
  Query: {
    projects: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<ProjectResponseCommon[]> => {
      if (args.orgLabel && typeof args.orgLabel === 'string') {
        const data = await nexus.Project.list(args.orgLabel);
        return data._results;
      }
      return [];
    },
    project: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Project | undefined> => {
      const { orgLabel, projectLabel } = args;
      if (
        orgLabel &&
        projectLabel &&
        typeof orgLabel === 'string' &&
        typeof projectLabel === 'string'
      ) {
        return nexus.Project.get(orgLabel, projectLabel);
      }
      Promise.reject(undefined);
    },
  },
  Mutation: {
    createProject: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Project> => {
      const { orgLabel, projectLabel } = args;
      if (
        orgLabel &&
        projectLabel &&
        typeof orgLabel === 'string' &&
        typeof projectLabel === 'string'
      ) {
        return nexus.Project.create(orgLabel, projectLabel, {
          description: 'made in graphql',
        });
      }
      Promise.reject(undefined);
    },
  },
  Project: {
    organization: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Organization> => {
      return nexus.Organization.get(parent._organizationLabel);
    },
    resources: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Resource[]> => {
      const data = await nexus.Resource.list(
        parent._organizationLabel,
        parent._label,
      );
      return data._results;
    },
    sparqlView: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Object> => {
      let data = null;
      if (args.query && typeof args.query === 'string') {
        data = await nexus.View.sparqlQuery(
          parent._organizationLabel,
          parent._label,
          'nxv:defaultSparqlIndex',
          args.query,
        );
      }
      return { data };
    },
  },
};

export default resolvers;
