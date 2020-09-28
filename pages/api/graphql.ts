import { ApolloServer } from 'apollo-server-micro';
import { typeDefs, resolvers } from 'graphql/schemas/next';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {};
  },
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
