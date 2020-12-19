import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import resolvers from "../../graphql/Aresolever";
import typeDefs from "../../graphql/Ashema";
const Book = require("../../models/book");

export const schema = makeExecutableSchema({ typeDefs, resolvers });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default new ApolloServer({ schema, uploads: false }).createHandler({
  path: "/api/graphql",
});
