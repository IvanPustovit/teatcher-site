const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/UserModel");
const File = require("../Models/FileModel");
const StudentList = require("../Models/StudentListModel");

const { createDirService } = require("../services/fileService");
const sendEmailPass = require("../services/nodemail");

const registration = async (req, res) => {
  try {
    const {
      name,
      lastName,
      fatherName,
      avatar,
      classNumber,
      type,
      email,
      password,
      student,
      birthday,
    } = req.body;
    const candidate = await User.findOne({ idStudent: student });

    if (candidate) {
      return res.status(400).json({
        message: `Такий учень ${lastName} ${name} ${fatherName} уже зареєстрований`,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      lastName,
      fatherName,
      email,
      dateRegister: Date.now(),
      avatar,
      password: hashPassword,
      classNumber,
      type,
      idStudent: student,
      birthday,
      ambition: "",
    });
    await user.save();
    await createDirService(new File({ user: user._id, name: "" }));
    await StudentList.findByIdAndUpdate(
      student,
      { owner: user._id },
      { new: true }
    );
    return res.status(201).json({ message: "Користувача зареєстровано", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error register" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (!candidate) {
      return res
        .status(400)
        .send({ message: `Користувача з email ${email} не знайдено` });
    }
    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      return res.status(400).send({ message: "невірний пароль" });
    }

    const token = jwt.sign(
      {
        userId: candidate._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const user = await User.findByIdAndUpdate(candidate._id, {
      $push: { dateLogin: Date.now() },
    });

    res.json({ token, user, message: "Вітаємо в системі" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error login" });
  }
};

const sendEmailPassword = async (req, res) => {
  try {
    const candidate = await User.findOne({
      email: req.body.email,
      idStudent: req.body.student,
    });

    if (!candidate) {
      return res.status(400).send({ message: `Користувача не знайдено` });
    }
    const subject = "Відновлення пароля";
    const text = `Доброго дня. Ви запросили відновлення пароля. Для того щоб змінити Ваш пороль в особистий кабінет перейдіть за посиланням ${process.env.VIEW_UI}reset?user=${candidate._id}`;

    await sendEmailPass(req.body.email, subject, text);
    res.json({
      message: `Вам на email ${req.body.email} відправлено посилання`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error login" });
  }
};

const auth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    const candidate = await User.findOne({ _id: decoded.userId });
    if (!candidate) {
      return res.status(400).send({ message: `Користувача не знайдено` });
    }

    const tokenNew = jwt.sign(
      {
        userId: candidate._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const user = await User.findByIdAndUpdate(candidate._id, {
      $push: { dateLogin: Date.now() },
    });

    res.json({ token: tokenNew, user, message: "Вітаємо в системі" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error login" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, birthday, ambition, email } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { birthday, ambition, email },
      { new: true }
    );

    res.json({ user, message: "Відредаговано" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Щось пішло не так" });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { id, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashPassword },
      { new: true }
    );

    res.json({ message: "Пароль змінено" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Щось пішло не так" });
  }
};

const updateIsRules = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    const user = await User.findByIdAndUpdate(
      { _id: decoded.userId },
      { isRules: true },
      { new: true }
    );
    res.json({ user, message: "З правилами безпеки ознайомлені" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Щось пішло не так" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.query.user);
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Щось пішло не так" });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find({ classNumber: req.query.classNumber });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Щось пішло не так" });
  }
};

module.exports = {
  registration,
  login,
  auth,
  updateUser,
  updateIsRules,
  sendEmailPassword,
  getUser,
  updateUserPassword,
  getUsers,
};
