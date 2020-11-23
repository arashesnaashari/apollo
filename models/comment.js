const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
  date: {
    type: Date,
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    autopopulate: true,
  },
});

module.exports =
  mongoose.model.Comment ||
  mongoose.model("Comment", commentSchema.plugin(autopopulate));
