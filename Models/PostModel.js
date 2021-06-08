const { Schema, model } = require("mongoose");

const Post = new Schema({
  post: { type: String, required: true },
  date: { type: String },
});

module.exports = model("Post", Post);
