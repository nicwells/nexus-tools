export const typeDefs = `
  type Query {
    resource(
      orgLabel: String!
      projectLabel: String!
      schemaId: String!
      resourceId: String!
    ): Resource
    projects(orgLabel: String!): [Project]
  }

  type Resource {
    id: String
    self: String
    rev: Int
    deprecated: Boolean
    project: Project
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
    organization: Organization
    resources: [Resource]
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

  schema {
    query: Query
  }
`;
