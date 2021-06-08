const { Schema, model, Types } = require("mongoose");

const LessonFile = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  typeDoc: { type: String, required: true },
  classNumber: { type: Number, required: true },
  dateLesson: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  typeProgress: { type: String },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  user: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("LessonFile", LessonFile);
