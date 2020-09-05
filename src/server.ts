import { ApolloServer, gql } from 'apollo-server-express';
import scrap from './scrap';

// prettier-ignore
// The GraphQL schema
const typeDefs = gql`
  type Lyric {
    element: String
    content: String
  }
  type Song {
		title: String
    lyrics: [Lyric]
	}
  type Query {
    "A simple type for getting started!"
    hello: String
    getSong(id: Int): Song
  }
`;

// prettier-ignore
// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    getSong: (__, args: any, _) => {
      const { id } = args;
      let a = scrap(id.toString());
      return a;
    }, 
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

export default server;
