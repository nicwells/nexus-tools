import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

function ResourceCard() {
  return (
    <Query
      query={gql`
        query getResource {
          resource(
            orgLabel: "anonymous"
            projectLabel: "asd"
            schemaId: "_"
            resourceId: "ef83958a-dbbb-424b-98c8-c47048b16971"
          ) {
            id
            project {
              label
              organization {
                label
              }
            }
          }
        }
      `}
    >
      {//
      // @ts-ignore
      ({ loading, data }) => {
        if (loading) {
          return <h1>Loading resource...</h1>;
        }

        const {
          id,
          project,
          project: { organization },
        } = data.resource;

        return (
          <>
            <h1>{id}</h1>
            <p>
              Part of: <span>{organization.label}</span> |{' '}
              <span>{project.label}</span>
            </p>
          </>
        );
      }}
    </Query>
  );
}

export default ResourceCard;
