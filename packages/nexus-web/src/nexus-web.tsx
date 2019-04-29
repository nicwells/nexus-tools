import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ProjectList } from 'nexus-ui';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  headers: {
    Authorization: '',
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <ProjectList orgLabel="00snbnkli11knwj" />
      <ProjectList orgLabel="3iv2goql7xvkiel" />
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
