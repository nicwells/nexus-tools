import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar JSON
  directive @hasPermission(permission: String) on FIELD | FIELD_DEFINITION
  directive @upper on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT

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
    ): Resource @hasPermission(permission: "resources/read")
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

export default typeDefs;
