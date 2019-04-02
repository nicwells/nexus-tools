import { ApolloServer, gql, IResolvers } from 'apollo-server';
import { Nexus, Project, Organization, Resource } from '@bbp/nexus-sdk';
import GraphQLJSON from 'graphql-type-json';
import { orgsResolvers } from './organization';
import { projectsResolvers } from './project';
import { resourcesResolvers } from './resources';

// Setup Nexus environment
Nexus.setEnvironment('https://bbp-nexus.epfl.ch/staging/v1');
// This is just a test, it needs to be set on request time
Nexus.setToken('');

const typeDefs = gql`
  scalar JSON

  type Query {
    organizations: [Organization]
    organization(label: String!): Organization
    projects(orgLabel: String!): [Project]
    project(orgLabel: String!, projectLabel: String!): Project
    resources(orgLabel: String!, projectLabel: String!): [Resource]
    resource(
      orgLabel: String!
      projectLabel: String!
      schemaId: String!
      resourceId: String!
    ): Resource
  }

  type Organization {
    context: String
    id: String
    deprecated: Boolean
    rev: Int
    uuid: String
    label: String
    projects: [Project]
  }

  type Project {
    orgLabel: String
    id: String
    context: String
    type: String
    label: String
    base: String
    version: Int
    deprecated: Boolean
    createdAt: String
    updatedAt: String
    apiMappings: [ApiMapping]
    organization: Organization
    resources: [Resource]
  }

  type Resource {
    id: String
    self: String
    rev: Int
    deprecated: Boolean
    data: JSON
    project: Project
  }

  type ACL {
    id: String
    type: String
    path: String
    acl: [IdentityPermissionPair]
    createdAt: String
    createdBy: String
    rev: Int
  }

  type ApiMapping {
    prefix: String
    namespace: String
  }

  type IdentityPermissionPair {
    permissions: [String]
    identity: Identity
  }

  enum Identity {
    User
    Group
    Authenticated
    Anonymous
  }
`;

const resolvers: IResolvers = {
  Query: {
    ...orgsResolvers.Query,
    ...projectsResolvers.Query,
    ...resourcesResolvers.Query,
  },
  Organization: {
    projects: async (parent, args, context): Promise<Project[]> => {
      const data = await Project.list(parent.label);
      return data.results;
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
  Resource: {
    project: async (parent): Promise<Project> => {
      const data = await Project.get(parent.orgLabel, parent.projectLabel);
      return data;
    },
  },
  JSON: GraphQLJSON,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    // create new nexus instance here
    return {
      token,
    };
  },
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
