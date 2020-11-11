const Book = require("../models/book");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const books = async (bookId) => {
  try {
    const book = await Book.findById(bookId);

    return {
      ...book._doc,
      _id: book.id,
      comments: comment.bind(this, book.comments),
    };
  } catch (err) {
    console.log(err);
  }
};

const user = async (userId) => {
  try {
    const user0 = await User.findById(userId);

    return {
      ...user0._doc,
      _id: user0.id,
      comments: comment.bind(this, user0.comments),
    };
  } catch (err) {
    console.log(err);
  }
};
const comment = async (commentId) => {
  try {
    const comments0 = await Comment.find({
      _id: { $in: commentId },
    });
    comments0.map((comment1) => {
      return {
        ...comment1._doc,
        _id: comment1.id,
        creator: user.bind(this, comment1._doc.creator),
        book: books.bind(this, comment1._doc.book),
      };
    });
    return comments0;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  //Query
  books: async () => {
    try {
      const books = await Book.find();
      return books.map((book) => {
        return {
          ...book._doc,
          _id: book.id,
          comments: comment.bind(this, book._doc.comments),
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
        comments: comment.bind(this, book._doc.comments),
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
    });
    let createdComment;
    try {
      const result = await comment.save();
      createdComment = {
        ...result._doc,
        _id: result._doc._id,
        book: books.bind(this, result._doc.book),
        creator: user.bind(this, comment.creator),
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

//
// Event.find().populate({
//   path: "creator",
//   populate: {
//         path: "createdEvents"
//         model : Event
//         populate: {
//               path: "..."
//         }
//   }
// });

// //
// With mongoose 5+, you can populate nested document with: populate({path: "nestedRef", populate: { path: "subNestedRef" }})

// So here, it would look like this:

//      events: async () => {
//         try {
//           const events = await Event.find().populate({
//             path: "creator",
//             populate: { path: "createdEvents" }
//           });
//           return events;
//         } catch (err) {
//           throw err;
//         }
//       },
