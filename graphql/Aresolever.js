import dbConnect from "../utils/dbConnect";
const Book = require("../models/book");
const User = require("../models/user");
const Post = require("../models/post");
const View = require("../models/view");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dbConnect();

const resolvers = {
  Query: {
    async books() {
      try {
        const books = await Book.find();
        return books.map((book) => {
          return {
            ...book._doc,
            _id: book.id,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
    async posts() {
      try {
        const posts = await Post.find();
        return posts.map((post) => {
          return {
            ...post._doc,
            _id: post.id,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
    async users() {
      try {
        const books = await User.find();
        return books.map((book) => {
          return {
            ...book._doc,
            _id: book.id,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
    async book(parent, args) {
      try {
        const book = await Book.findOne({ _id: args._id });
        return {
          ...book._doc,
          _id: book.id,
        };
      } catch (err) {
        console.log(err);
      }
    },
    async post(parent, args) {
      try {
        const post = await Post.findOne({ _id: args._id });
        return {
          ...post._doc,
          _id: post.id,
        };
      } catch (err) {
        console.log(err);
      }
    },
    async login(parent, { username, password }) {
      const Ouser = await User.findOne({ username });
      if (!Ouser) {
        throw new Error("User doesnt exist");
      }
      const isEqual = await bcrypt.compare(password, Ouser.password);
      if (!isEqual) {
        throw new Error("Password is not correct");
      }
      const token = jwt.sign(
        { userId: Ouser.id, username: Ouser.username },
        "somSuperKey",
        {
          expiresIn: "1h",
        }
      );
      return {
        userId: Ouser.id,
        token: token,
        tokenExpire: 1,
      };
    },
  },
  Mutation: {
    signIn: async (parent,args) => {
      try {
        const existingUser = await User.findOne({
          phone: args.input.phone,
        });
        if (existingUser) {
          throw new Error("User exists already.");
        }
        const hashedPassword = await bcrypt.hash(args.input.password, 12);

        const user = new User({
          phone: args.input.phone,
          username: args.input.username,
          password: hashedPassword,
        });

        const result = await user.save();

        return { ...result._doc, password: null, _id: result.id };
      } catch (error) {
        throw error;
      }
    },
    createComment: async (parent,args) => {
      const comment = new Comment({
        text: args.input.text,
        rate: args.input.rate,
        creator: args.input.userId,
        book: args.input.bookId,
        date: new Date(),
      });
      let createdComment;
      try {
        const result = await comment.save();
        createdComment = {
          ...result._doc,
          _id: result._doc._id,
          book: result._doc.bookId,
          creator: result._doc.creator,
          date: result._doc.date,
        };

        const book = await Book.findById(args.input.bookId);

        book.comments.push(comment);
        await book.save();

        return createdComment;
      } catch (err) {
        console.log(err);
      }
    },

    createView: async (parent,args) => {
      const view = new View({
        text: args.input.text,
        rate: args.input.rate,
        creator: args.input.userId,
        post: args.input.postId,
        date: new Date(),
      });
      let createdView;
      try {
        const result = await view.save();
        createdView = {
          ...result._doc,
          _id: result._doc._id,
          post: result._doc.postId,
          creator: result._doc.creator,
          date: result._doc.date,
        };

        const post = await Post.findById(args.input.postId);

        post.views.push(view);
        await post.save();

        return createdView;
      } catch (err) {
        console.log(err);
      }
    },
    createPost: async (parent,args) => {
      const post = new Post({
        title: args.input.title,
        body: args.input.body,
        creator: args.input.userId,
        image: args.input.image,
        date: new Date().toISOString(),
      });
      let createdPost;
      try {
        const result = await post.save();
        createdPost = {
          ...result._doc,
          _id: result._doc._id,
          title: result._doc.title,
          body: result._doc.body,
          image: result._doc.image,
          creator: result._doc.creator,
          date: result._doc.date,
        };

        const user = await User.findById(args.input.userId);

        user.posts.push(post);
        await user.save();

        return createdPost;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
module.exports = [resolvers];



// USER = 5fba7c7f637eca2ba0e4e39e
// BOOK = 5fa85dbeae4337bd0925c2b0
// POST =5fbe7823ed88c62fd4859a83
