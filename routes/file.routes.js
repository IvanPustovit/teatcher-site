const Router = require("express");
const {
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
} = require("../controllers/file");
const authMiddleware = require("../middleware/auth.middleware");
const router = new Router();

router.post("", authMiddleware, createDirController);
router.post("/upload", authMiddleware, uploadFile);
router.post("/upload/lesson", authMiddleware, uploadFileLesson);
router.post("/upload/avatar", authMiddleware, uploadAvatar);
router.get("", getFille);
router.get("/progress", getFilleProgress);
router.get("/lesson", getFilleLesson);
router.put("/task", updateFilleLesson);
router.get("/task", getFilleTask);
router.get("/download", downloadFile);
router.delete("/delete", deleteFileController);

module.exports = router;
