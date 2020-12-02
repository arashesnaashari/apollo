const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const readerSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  pages: {
    type: String,
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    autopopulate: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
});

var Reader;

if (mongoose.models.Reader) {
  Reader = mongoose.model("Reader");
} else {
  Reader = mongoose.model("Reader", readerSchema.plugin(autopopulate));
}

module.exports = Reader;
