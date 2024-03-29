const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ratingStar: {
    type: Number,
    required: false,
  },
  publication: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      autopopulate: true,
    },
  ],
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  ],
});

var Book;

if (mongoose.models.Book) {
  Book = mongoose.model("Book");
} else {
  Book = mongoose.model("Book", bookSchema.plugin(autopopulate));
}

module.exports = Book;
