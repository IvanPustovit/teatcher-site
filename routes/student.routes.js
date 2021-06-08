const Router = require("express");

const {
  addBase,
  getStudent,
  deleteStudent,
} = require("../controllers/students");
let router = require("./auth.routes");

router = new Router();

router.post("/students", addBase);
router.get("/students/:id", getStudent);
router.delete("/students/:id", deleteStudent);

module.exports = router;
