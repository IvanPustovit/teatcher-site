const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

// const cors = require("cors");
const connectDB = require("./utils/connectDB");

const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const students = require("./routes/student.routes");
const posts = require("./routes/posts.routes");

const corsMiddleware = require("./middleware/cors.middleware");

require("dotenv").config();

const app = express();
// console.log(path.resolve(__dirname, "files"));

app.use(express.json());
app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(
  cors({
    credentials: true,
    origin: [
      "https://www.googleapis.com",
      "http://localhost:5000",
      "http://localhost:3000",
      "http://192.168.1.5",
      "http://95.158.10.253",
      "http://workroom-naumenko.cc",
      "https://workroom-naumenko.cc",

      // "http://localhost:19006",
      // "http://localhost:19001",
      // "http://localhost:19000",
      // "http://192.168.1.3:19006",
    ],
    optionsSuccessStatus: 200,
  })
);
app.use(express.static("static"));
app.use(express.static("files"));

const PORT = process.env.PORT || 3001;

app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);
app.use("/api", students);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
