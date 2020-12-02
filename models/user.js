const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      autopopulate: true,
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      autopopulate: true,
    },
  ],
  reader: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reader",
      autopopulate: true,
    },
  ],
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
      autopopulate: true,
    },
  ],
});

var User;

if (mongoose.models.User) {
  User = mongoose.model("User");
} else {
  User = mongoose.model("User", userSchema.plugin(autopopulate));
}

module.exports = User;
