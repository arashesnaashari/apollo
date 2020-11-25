
// import nextConnect from "next-connect";
// import mongoose from "mongoose";
// const { graphqlHTTP } = require("express-graphql");

// const handler = nextConnect();

// const schema = require("../../graphql/schema");
// const rootValue = require("../../graphql/resolves");
// mongoose
//   .connect(
//     "mongodb+srv://admin:admin@cluster0.dcr08.mongodb.net/new?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => {
//     console.log("!!!!!!!!!!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// handler.use(
//   "/api/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//     rootValue,
//   })
// );

// export default handler;
