import Reader from "../models/reader";
import dbConnect from "../utils/dbConnect";
const Book = require("../models/book");
const User = require("../models/user");
const Post = require("../models/post");
const View = require("../models/view");
const Read = require("../models/reader");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
dbConnect();

var xxx = new Date();
const { year, literal, month, day, weekday } = Object.fromEntries(
  new Intl.DateTimeFormat("fa", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
    .formatToParts(xxx)
    .map((item) => [item.type, item.value])
);
const faDate = `${weekday}${literal}${day} ${month} ${year}`;

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on("finish", () => resolve())
      .on("error", reject)
  );

const resolvers = {
  Query: {
    async books() {
      try {
        const books = await Book.find();
        return books.map((book) => {
          let ratingStarFunc = book.comments.map((e) => {
            if (e.rate) {
              return e.rate;
            }
          });
          if (ratingStarFunc.length == 0) {
            ratingStarFunc.push(5);
          }

          let average = (array) =>
            array.reduce((a, b) => {
              return a + b;
            }, 0) / array.length;
          return {
            ...book._doc,
            _id: book.id,
            ratingStar: Math.round(average(ratingStarFunc)),
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
        let ratingStarFunc = book.comments.map((e) => {
          if (e.rate) {
            return e.rate;
          }
        });
        if (ratingStarFunc.length == 0) {
          ratingStarFunc.push(5);
        }

        let average = (array) =>
          array.reduce((a, b) => {
            return a + b;
          }, 0) / array.length;
        return {
          ...book._doc,
          _id: book.id,
          ratingStar: Math.round(average(ratingStarFunc)),
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
    async user(parent, args) {
      try {
        const user = await User.findOne({ _id: args._id });
        return {
          ...user._doc,
          _id: user.id,
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
    signIn: async (parent, args) => {
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
    createComment: async (parent, args) => {
      const createdComment = await Comment.findOne({
        creator: args.input.userId,
        book: args.input.bookId,
      });

      if (createdComment) {
        throw new Error(
          "فقط یک بار می توانید نظر دهید ؛ می توانید نظر قبلی خود را حذف کنید"
        );
      } else {
        const comment = new Comment({
          text: args.input.text,
          rate: args.input.rate,
          creator: args.input.userId,
          book: args.input.bookId,
          date: faDate,
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
      }
    },
    deleteComment: async (parent, args) => {
      try {
        const deletedComment = await Comment.findByIdAndDelete({
          _id: args.commentId,
        });

        return deletedComment;
      } catch (err) {
        console.log(err);
      }
    },
    createView: async (parent, args) => {
      const view = new View({
        text: args.input.text,
        rate: args.input.rate,
        creator: args.input.userId,
        post: args.input.postId,
        date: faDate,
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
    createPost: async (parent, args) => {
      const post = new Post({
        title: args.input.title,
        body: args.input.body,
        creator: args.input.userId,
        image: args.input.image,
        date: faDate,
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
    addToShelf: async (parent, args) => {
      try {
        const user = await User.findOne({ _id: args.input.userId });
        await user.books.push(args.input.book);
        await user.save();
        return user;
      } catch (err) {
        console.log(err);
      }
    },
    read: async (parent, args) => {
      const createdEvent = await Reader.findOne({
        userId: args.input.userId,
        date: faDate,
        book: args.input.book,
      });
      if (createdEvent) {
        try {
          //Update
          createdEvent.pages = args.input.pages;
          createdEvent.time = args.input.time;
          createdEvent.save();
          return createdEvent;
        } catch (error) {
          console.log(error);
        }
      } else {
        const read = new Read({
          pages: args.input.pages,
          time: args.input.time,
          date: faDate,
          userId: args.input.userId,
          book: args.input.book,
        });
        let createdRead;
        try {
          const result = await read.save();
          createdRead = {
            ...result._doc,
            _id: result._doc._id,
            book: result._doc.book,
            userId: result._doc.userId,
          };

          const user = await User.findById(args.input.userId);

          user.reader.push(read);
          await user.save();

          return createdRead;
        } catch (err) {
          console.log(err);
        }
      }
    },
    uploadFile: async (parent, { file }) => {
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return file;
    },
  },
};
module.exports = [resolvers];

// USER = 5fba7c7f637eca2ba0e4e39e
// BOOK = 5fa85dbeae4337bd0925c2b0   5fa85dbeae4337bd0925c2b5
// POST =5fbe7823ed88c62fd4859a83

//url : String!
// const file = e.target.files[0] ==> pass to mutate
