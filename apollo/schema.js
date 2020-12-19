import { makeExecutableSchema } from "apollo-server-micro";
import resolvers from "../graphql/Aresolever";
import typeDefs from "../graphql/Ashema";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
