const Router = require("express");
const {
  registration,
  login,
  auth,
  updateUser,
  updateIsRules,
  sendEmailPassword,
  getUser,
  updateUserPassword,
  getUsers,
} = require("../controllers/auth");
const { userValidation } = require("../middleware/userValidate");

const router = new Router();

router.post("/registration", userValidation, registration);
router.post("/login", login);
router.post("/reset-pass", sendEmailPassword);
router.get("/reset", getUser);
router.post("/reset", updateUserPassword);
router.get("/auth", auth);
router.get("/users", getUsers);
router.post("/profile/update", updateUser);
router.get("/profile/rules", updateIsRules);

module.exports = router;
