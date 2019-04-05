import { Resource, Project } from '@bbp/nexus-sdk';
import { GraphQLObjectResolver } from '@apollographql/apollo-tools';
import fetch from 'node-fetch';

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
  Resource: {
    project: async (parent): Promise<Project> => {
      const data = await Project.get(parent.orgLabel, parent.projectLabel);
      return data;
    },
    statistics: async (parent, args, context): Promise<Object> => {
      const result = await fetch(
        `http://dev.nexus.ocp.bbp.epfl.ch/v1/views/${parent.orgLabel}/${
          parent.projectLabel
        }/${encodeURIComponent(parent.id)}/statistics`,
        {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        },
      );
      const data = await result.json();
      return data;
    },
  },
};

export default resolvers;
