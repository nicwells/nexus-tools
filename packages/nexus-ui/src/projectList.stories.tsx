import React from 'react';
import { storiesOf } from '@storybook/react';
// @ts-ignore
import apolloStorybookDecorator from 'apollo-storybook-react';
import { typeDefs } from './typedefs';
import ProjectList from './projectList';

const mocks = {
  Query: () => {
    return {
      projects: () => {
        return [{ id: '1', label: 'project1' }, { id: '2', label: 'project2' }];
      },
    };
  },
};

storiesOf('Projects', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
      apolloClientOptions: {
        uri: 'http://localhost:4000/graphql',
      },
    }),
  )
  .add('Project List', () => {
    return <ProjectList orgLabel="anonymous" />;
  });
