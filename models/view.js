const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const viewsSchema = new Schema({
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
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    autopopulate: true,
  },
});

var View;

if (mongoose.models.View) {
  View = mongoose.model("View");
} else {
  View = mongoose.model("View", viewsSchema.plugin(autopopulate));
}

module.exports = View;
