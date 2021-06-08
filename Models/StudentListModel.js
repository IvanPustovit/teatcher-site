const { Schema, model, Types } = require("mongoose");

const StudentList = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  classNumber: { type: Number, default: 0, required: true },
  dateAdd: { type: String },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("StudentList", StudentList);
