import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { RestLink } from 'apollo-link-rest';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const link = new RestLink({
  endpoints: { v1: 'http://dev.nexus.ocp.bbp.epfl.ch/v1' },
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  </ApolloProvider>
);

// ReactDOM.render(<App />, document.getElementById("root"));

export default function lol() {}
