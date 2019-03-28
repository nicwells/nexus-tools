import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { storiesOf } from '@storybook/react';
// @ts-ignore
import apolloStorybookDecorator from 'apollo-storybook-react';

const typeDefs = `
  type Query {
    helloWorld: String
  }

  schema {
    query: Query
  }
`;

const mocks = {
  Query: () => {
    return {
      helloWorld: () => {
        return 'Hello from Apollo!!';
      },
    };
  },
};

function HelloWorld() {
  return (
    // @ts-ignore
    <Query
      query={gql`
        query hello {
          helloWorld
        }
      `}
    >
      {({ loading, data }) => {
        const hello = data && data.helloWorld;

        if (loading) {
          return <h1>Loading one second please!</h1>;
        }

        return <h1>{hello}</h1>;
      }}
    </Query>
  );
}

storiesOf('Apollo Storybook Decorator', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
  .add('Hello World Test', () => {
    return <HelloWorld />;
  });
