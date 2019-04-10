import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

interface ProjectListProps {
  orgLabel: string;
}
const ProjectList: React.FunctionComponent<ProjectListProps> = ({
  orgLabel,
}) => {
  return (
    <Query
      query={gql`
        query getProjects($orgLabel: String!) {
          projects(orgLabel: $orgLabel) {
            id
            label
          }
        }
      `}
      variables={{ orgLabel }}
    >
      {//
      // @ts-ignore
      ({ loading, error, data, fetchMore }) => {
        if (error) {
          return (
            <p>
              Error->{' '}
              <span>
                {error.name}:{error.message}
              </span>
            </p>
          );
        }
        if (loading) {
          return <h1>Loading projects...</h1>;
        }

        return (
          <>
            <ul>
              {data.projects.map((p: { id: string; label: string }) => (
                <li key={p.id}>{p.label}</li>
              ))}
            </ul>
            <button
              onClick={() =>
                fetchMore({
                  // @ts-ignore
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      projects: [...prev.projects, ...fetchMoreResult.projects],
                    });
                  },
                })
              }
            >
              load more
            </button>
          </>
        );
      }}
    </Query>
  );
};

export default ProjectList;
