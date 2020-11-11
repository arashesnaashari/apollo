const Book = require("../models/book");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("jalali-moment");
const {GraphQLDateTime} = require('graphql-iso-date')

const customScalarResolver = {
  Date: GraphQLDateTime
};

// const books = async (bookId) => {
//   try {
//     const book = await Book.findById(bookId);

//     return {
//       ...book._doc,
//       _id: book.id,
//       comments: comment.bind(this, book.comments),
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };

// const user = async (userId) => {
//   try {
//     const user0 = await User.findById(userId);

//     return {
//       ...user0._doc,
//       _id: user0.id,
//       comments: comment.bind(this, user0.comments),
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };
// const comment = async (commentId) => {
//   try {
//     const comments0 = await Comment.find({
//       _id: { $in: commentId },
//     });
//     comments0.map((comment1) => {
//       return {
//         ...comment1._doc,
//         _id: comment1.id,
//         creator: user.bind(this, comment1._doc.creator),
//         book: books.bind(this, comment1._doc.book),
//         date: moment(new Date(result._doc.date).toISOString(), "YYYY/MM/DD")
//           .locale("fa")
//           .format("YYYY/MM/DD"),
//       };
//     });
//     return comments0;
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = {
  customScalarResolver,
  //Query
  books: async () => {
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
  book: async (args) => {
    try {
      const book = await Book.findById(args.id);
      return {
        ...book._doc,
        _id: book.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
  login: async ({ username, password }) => {
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
  //Mutation
  signIn: async (args) => {
    try {
      const existingUser = await User.findOne({
        phone: args.userInput.phone,
      });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        phone: args.userInput.phone,
        username: args.userInput.username,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (error) {
      throw error;
    }
  },
  createComment: async (args) => {
    const comment = new Comment({
      text: args.input.text,
      rate: args.input.rate,
      creator: "5fa962dbb2e6bc4610bb1ef8",
      book: args.input.book,
      date: moment(new Date().toISOString(), "YYYY/MM/DD")
        .locale("fa")
        .format("YYYY/MM/DD"),
    });
    let createdComment;
    try {
      const result = await comment.save();
      createdComment = {
        ...result._doc,
        _id: result._doc._id,
        book: result._doc.book,
        creator: comment.creator,
        date: moment(new Date().toISOString(), "YYYY/MM/DD")
          .locale("fa")
          .format("YYYY/MM/DD"),
      };

      const book = await Book.findById(args.input.book);

      book.comments.push(comment);
      await book.save();

      return createdComment;
    } catch (err) {
      console.log(err);
    }
  },
};
