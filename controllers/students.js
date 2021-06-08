const Students = require("../Models/StudentListModel");

const addBase = async (req, res) => {
  try {
    const { name, lastName, fatherName, classNumber, _id } = req.body;
    const candidate = await Students.findOne({
      _id,
    });
    if (candidate) {
      await Students.findByIdAndUpdate(
        _id,
        { name, lastName, fatherName },
        { new: true }
      );
      return res.status(200).json({ message: `Відредаговано` });
    }

    const student = new Students({
      name,
      lastName,
      fatherName,
      classNumber,
      dateAdd: Date.now(),
    });
    await student.save();
    return res.status(201).json({ message: "Учня добавлено", student });
  } catch (error) {
    console.log(error);
    res.send({ message: "Server error" });
  }
};

const getStudent = async (req, res) => {
  try {
    const classNumber = req.params.id;
    const students = await Students.find({ classNumber: classNumber }).populate(
      "owner"
    );
    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.send({ message: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    await Students.findByIdAndDelete(id);
    return res.status(200).json({ message: "Видалено" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Server error" });
  }
};

module.exports = { addBase, getStudent, deleteStudent };
