import { gql } from 'apollo-server';

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
    sparqlView(
      orgLabel: String!
      projectLabel: String!
      query: String
    ): SparqlView
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
    sparqlView(query: String): SparqlView
  }

  type Resource {
    id: String
    self: String
    rev: Int
    deprecated: Boolean
    data: JSON
    project: Project
    statistics: Statistics
  }

  type Statistics {
    # total number of events in the stream
    totalEvents: Int
    # number of events in the stream that have been considered by the view
    processedEvents: Int
    # number of events in the stream that remain to be considered by the view
    remainingEvents: Int
    # number of events in the stream that have been used to update an index
    evaluatedEvents: Int
    # number of events in the stream that have been discarded (were not evaluated due to filters)
    discardedEvents: Int
    # instant of the last known event in the stream
    lastEventDateTime: String
    # instant of the last processed event in the stream
    lastProcessedEventDateTime: String
    # instant of the last evaluated event in the stream (used to update an index)
    lastEvaluatedEventDateTime: String
    # instant of the last discarded event in the stream (was not evaluated due to filters)
    lastDiscardedEventDateTime: String
    # time interval between the last processed event instant and the last known event instant
    delay: String
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

  type SparqlView {
    context: String
    id: String
    type: [String]
    data: JSON
  }
`;

export default typeDefs;
