import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./schema";
import resolvers from "./resolves";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
