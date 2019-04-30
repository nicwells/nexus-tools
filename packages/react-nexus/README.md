# `react-nexus`

> A set of React components for Nexus

## Usage

Wrap your App with the Provider

```tsx
import React from 'react';
import { render } from 'react-dom';
import { NexusProvider } from 'react-nexus';
import { createNexusClient } from 'nexus-client';

const nexus = createNexusClient({
  uri: 'https://api.io',
  version: 'v1',
});

const rootElement = document.getElementById('root');
render(
  <NexusProvider nexusClient={nexus}>
    <App />
  </NexusProvider>,
  rootElement,
);
```

Use any API calls as React component

```tsx
import { Organization } from 'react-nexus';

const ListOrgs = () => (
  <Organization.List>
    {({ data, loading, error }) => {
      if (loading) {
        return <p>Loading Organization...</p>;
      }
      if (error) {
        return <p>An error occured: {error.reason}</p>;
      }
      // @ts-ignore
      return data._results.map(org => <p>org._label</p>);
    }}
  </Organization.List>
);
```
