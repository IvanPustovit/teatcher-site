const path = require("path");
const fs = require("fs");

const { createDirService, deleteFile } = require("../services/fileService");
const User = require("../Models/UserModel");
const File = require("../Models/FileModel");
const LessonFile = require("../Models/LessonsFileModel");
const sendEmailPass = require("../services/nodemail");

const createDirController = async (req, res) => {
  try {
    const { name, type, parent, title, typeDoc } = req.body;
    const file = new File({
      name,
      type,
      parent,
      title,
      typeDoc,
      user: req.user._id,
    });

    const parentFile = await File.findOne({ _id: parent });
    if (!parentFile) {
      file.path = name;
      await createDirService(file);
    } else {
      file.path = path.join(parentFile.path, file.name);
      await createDirService(file);
      parentFile.childs.push(file._id);
      await parentFile.save();
    }
    await file.save();
    return res.json(file);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getFille = async (req, res) => {
  try {
    const files = await File.find({
      typeDoc: req.query.typeDoc,
    });
    return res.json({ files });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getFilleProgress = async (req, res) => {
  try {
    const files = await File.find({
      typeProgress: req.query.typeProgress,
    });
    return res.json({ files });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getFilleLesson = async (req, res) => {
  try {
    console.log(req.query);
    const files = await LessonFile.find({
      classNumber: req.query.classNumber,
      // dateLesson: req.query.dateLesson,
      typeDoc: req.query.typeDoc,
    }).populate("user");
    return res.json({ files });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getFilleTask = async (req, res) => {
  try {
    const files = await LessonFile.find({
      // classNumber: req.query.classNumber,
      // dateLesson: req.query.dateLesson,
      typeDoc: req.query.typeDoc,
      user: req.query.user,
    }).populate("user");
    return res.json({ files });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateFilleLesson = async (req, res) => {
  try {
    const file = await LessonFile.findOneAndUpdate(
      { _id: req.body.id },
      { isDone: req.body.isDone },
      { new: true }
    );
    const user = await User.findById(file.user);
    if (file.typeDoc === "task" && file.isDone) {
      const subject = `Домашнє завдання ${file.name}`;
      const text = `Домашнє завдання ${file.name} зараховано`;
      await sendEmailPass(user.email, subject, text);
    }
    return res.json({ file });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const uploadFile = async (req, res) => {
  try {
    const file = req.files.file;
    const { title, typeDoc, typeProgress } = req.body;
    const parent = await File.findOne({
      user: req.userId,
      _id: req.body.parent,
    });

    let filePath;

    if (parent) {
      filePath = path.resolve("files", req.user.userId, parent.path, file.name);
    } else {
      filePath = path.resolve("files", req.user.userId, file.name);
    }

    if (fs.existsSync(filePath)) {
      return res.status(400).json({ message: "Файл існує" });
    }
    file.mv(filePath);

    const type = file.name.split(".").pop();
    let filePathBase = file.name;
    if (parent) {
      filePathBase = path.resolve(parent.path, file.name);
    }

    const dbFile = new File({
      name: file.name,
      type,
      typeDoc: typeDoc,
      typeProgress: typeProgress,
      title: title,
      size: file.size,
      path: filePathBase,
      parent: parent?._id,
      user: req.user.userId,
      accessLink: process.env.VIEW_UI + req.user.userId + "/" + file.name,
    });

    await dbFile.save();
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { files: dbFile._id },
    });
    res.status(201).json({ message: "Файл загружено на сервер", dbFile });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const uploadFileLesson = async (req, res) => {
  try {
    const file = req.files.file;
    const { title, typeDoc, classNumber, dateLesson } = req.body;
    let filePath;
    filePath = path.resolve("files", req.user.userId, file.name);

    if (fs.existsSync(filePath)) {
      return res.status(400).json({ message: "Файл існує" });
    }
    file.mv(filePath);

    const type = file.name.split(".").pop();
    let filePathBase = file.name;

    const dbFile = new LessonFile({
      name: file.name,
      type,
      classNumber,
      dateLesson,
      typeDoc: typeDoc,
      typeProgress: "",
      title: title,
      size: file.size,
      path: filePathBase,
      user: req.user.userId,
      accessLink: process.env.VIEW_UI + req.user.userId + "/" + file.name,
    });

    await dbFile.save();

    const user = await User.findByIdAndUpdate(req.user.userId, {
      $push: { files: dbFile._id },
    });
    if (typeDoc === "task") {
      const subject = `Домашнє завдання від ${user.lastName} ${user.name}`;
      const text = `На сайт було завантажено домашнє завдання від учня ${
        user.lastName
      } ${user.name} ${user.classNumber} класу. Дата виконання ${new Date(
        Number(dateLesson)
      )
        .toISOString()
        .substring(0, 10)}`;
      await sendEmailPass("naum.svetka@gmail.com", subject, text);
    }
    res.status(201).json({ message: "Файл загружено на сервер", dbFile });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.query.id);
    const fileLesson = await LessonFile.findById(req.query.id);

    let pathFile;
    let pathFileLesson;

    file
      ? (pathFile = path.resolve("files", file.user.toString(), file.path))
      : (pathFileLesson = path.resolve(
          "files",
          fileLesson.user.toString(),
          fileLesson.path
        ));

    if (fs.existsSync(pathFile || pathFileLesson)) {
      return res.download(pathFile ? pathFile : pathFileLesson);
    }
    return res.status(400).json({ message: "Download error" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Download error" });
  }
};

const deleteFileController = async (req, res) => {
  try {
    const file = await File.findById(req.query.id);
    const fileLesson = await LessonFile.findById(req.query.id);
    if (!file && !fileLesson) {
      return res.status(400).json({ message: "file not found" });
    }
    deleteFile(file || fileLesson);
    file ? await file.remove() : await fileLesson.remove();
    const user = await User.findOneAndUpdate(
      { files: req.query.id },
      {
        $pull: { files: req.query.id },
      }
    );

    return res.status(200).json({ message: "Файл видалено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete error" });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const file = req.files.file;
    const { title, typeDoc } = req.body;

    let filePath;

    filePath = path.resolve("files", req.user.userId, file.name);

    file.mv(filePath);

    const type = file.name.split(".").pop();
    let filePathBase = file.name;

    const dbFile = new File({
      name: file.name,
      type,
      typeDoc: typeDoc,
      title: title,
      size: file.size,
      path: filePathBase,
      user: req.user.userId,
      accessLink: process.env.VIEW_UI + req.user.userId + "/" + file.name,
    });

    await dbFile.save();

    const user = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { avatar: process.env.VIEW_UI + req.user.userId + "/" + file.name },
      { new: true }
    );
    res.status(200).json({ message: "Файл загружено на сервер", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  createDirController,
  getFille,
  uploadFile,
  downloadFile,
  deleteFileController,
  getFilleProgress,
  uploadAvatar,
  uploadFileLesson,
  getFilleLesson,
  updateFilleLesson,
  getFilleTask,
};
