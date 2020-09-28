import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
    },
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});

export default client;
