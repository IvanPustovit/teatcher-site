const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classNumber: { type: Number, default: 0 },
  type: { type: String, required: true },
  dateRegister: { type: String },
  birthday: { type: String },
  isRules: { type: Boolean, default: false },
  ambition: { type: String },
  dateLogin: [{ type: String }],
  avatar: { type: String },
  files: [{ type: Types.ObjectId, ref: "File" }],
  idStudent: { type: Types.ObjectId, ref: "StudentList" },
});

module.exports = model("User", User);
