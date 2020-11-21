//modules
const express = require("express");
const next = require("next");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const isAuth = require("./middleware/is-auth");
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
const passport = require("passport");

const session = require("express-session");
require("./passport_setup");
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
  server.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  server.use(cors());
  const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  };
  // ensureAuth: function (req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next()
  //   } else {
  //     res.redirect('/')
  //   }
  // },
  // ensureGuest: function (req, res, next) {
  //   if (!req.isAuthenticated()) {
  //     return next();
  //   } else {
  //     res.redirect('/dashboard');
  //   }
  // },

  server.use(passport.initialize());
  server.use(passport.session());

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

  server.get("/failed", (req, res) => res.send("You Failed to log in!"));
  server.use("/xxxx", (req, res) =>
    res.json({
      posts: {
        title: "first posts",
        desc: "ramdom data uoy sholudnt access",
      },
    })
  );

  // In this route you can see that if the user is logged in u can acess his info in: req.user
  server.get("/good", isLoggedIn, (req, res) => {
    res.send(`Welcome mr ${req.user.displayName}!`);
    console.log(req.user);
  });

  // Auth Routes
  server.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  server.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/good");
    }
  );

  server.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/");
  });
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
  // server.use("/", (req, res) => {
  //   return app.render(req, res, "/", req.query);
  // });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
