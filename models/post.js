const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
  data: {
    type: String,
    required: true,
  },
  views: [
    {
      type: Schema.Types.ObjectId,
      ref: "View",
      autopopulate: true,
    },
  ],
  date: {
    type: String,
    required: true,
  },
});

var Post;

if (mongoose.models.Post) {
  Post = mongoose.model("Post");
} else {
  Post = mongoose.model("Post", postSchema.plugin(autopopulate));
}

module.exports = Post;
