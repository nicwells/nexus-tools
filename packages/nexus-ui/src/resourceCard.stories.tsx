import React from 'react';
import { storiesOf } from '@storybook/react';
// @ts-ignore
import apolloStorybookDecorator from 'apollo-storybook-react';
import ResourceCard from './resourceCard';
import { typeDefs } from './typedefs';

const mocks = {
  Query: () => {
    return {
      resource: () => {
        return {
          id: 'ef83958a-dbbb-424b-98c8-c47048b16971',
          data: {
            name: 'Julien',
            type: ['MyType', 'Lol', 'Plop'],
          },
          project: {
            label: 'asd',
            organization: {
              label: 'anonymous',
            },
          },
        };
      },
    };
  },
};

storiesOf('Resources', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
  .add('Resource Card', () => {
    return <ResourceCard />;
  });
