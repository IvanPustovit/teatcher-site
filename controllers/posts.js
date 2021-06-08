const Post = require("../Models/PostModel");

const addPost = async (req, res) => {
  try {
    const { post, _id } = req.body;
    candidate = await Post.findById(_id);
    if (candidate) {
      await Post.findByIdAndUpdate(_id, { post }, { new: true });
      return res.status(200).json({ message: `Відредаговано` });
    }
    const newPost = new Post({
      post,
      date: Date.now(),
    });
    await newPost.save();
    return res.status(201).json({ message: "Пост створено", newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { _id } = req.query;
    await Post.findOneAndDelete({ _id });
    return res.status(200).json({ message: `Видалено` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addPost, getPosts, deletePost };
