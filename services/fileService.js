const fs = require("fs");
const path = require("path");
const File = require("../Models/FileModel");

const createDirService = (file) => {
  const filePath = path.resolve("files", file.user.toString(), file.path);

  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
        return resolve({ message: "File was created" });
      } else {
        return reject({ message: "File already exist" });
      }
    } catch (error) {
      return reject({ message: "File error", error });
    }
  });
};

const deleteFile = (file) => {
  const filePath = path.resolve("files", file.user.toString(), file.path);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

module.exports = { createDirService, deleteFile };
