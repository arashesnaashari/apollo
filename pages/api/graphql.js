import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import resolvers from "../../graphql/Aresolever";
import typeDefs from "../../graphql/Ashema";

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: "/api/graphql",
});
