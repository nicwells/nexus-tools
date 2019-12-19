import {
  Resource,
  Project,
  ExpandedResource,
  Statistics,
} from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';
import fetch from 'node-fetch';
import { ApolloContext } from '..';

const resolvers: {
  [key: string]: {
    [key: string]: GraphQLObjectResolver<any, any>;
  };
} = {
  Query: {
    resources: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Resource[]> => {
      if (
        args.orgLabel &&
        args.projectLabel &&
        typeof args.orgLabel === 'string' &&
        typeof args.projectLabel === 'string'
      ) {
        // const data = await nexus.Resource.list(
        const resources = await nexus.Resource.list(
          args.orgLabel,
          args.projectLabel,
        );
        return resources._results;
      }
      return [];
    },
    resource: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Resource | ExpandedResource | undefined> => {
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
        const resource = await nexus.Resource.get(
          orgLabel,
          projectLabel,
          resourceId,
        );
        const data = await nexus.Resource.getSource(
          orgLabel,
          projectLabel,
          resourceId,
        );
        return { ...resource, _source: JSON.stringify(data) };
      }
      Promise.reject(undefined);
    },
  },
  Resource: {
    project: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Project> => {
      const data = await nexus.Project.get(
        parent.orgLabel,
        parent.projectLabel,
      );
      return data;
    },
    statistics: async (
      parent,
      args,
      { nexus }: ApolloContext,
    ): Promise<Statistics> => {
      const data = await nexus.View.statistics(
        parent.orgLabel,
        parent.projectLabel,
        parent.id,
      );
      return data;
    },
  },
};

export default resolvers;
