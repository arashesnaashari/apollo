//modules
const express = require("express");
const next = require("next");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const isAuth = require("./middleware/is-auth");
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
//next
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// schema
const schema = require("./graphql/schema");
const rootValue = require("./graphql/resolves");

//server
app.prepare().then(() => {
  const server = express();
  server.use(isAuth);
  mongoose
    .connect(
      "mongodb+srv://admin:admin@cluster0.dcr08.mongodb.net/new?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("!!!!!!!!!!!");
    })
    .catch((err) => {
      console.log(err);
    });

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
      rootValue,
    })
  );
  server.get("*", (req, res) => {
    return handle(req, res); // for all the react stuff
  });
  //   server.use("/a", (req, res) => {
  //     return app.render(req, res, "/a", req.query);
  //   });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
