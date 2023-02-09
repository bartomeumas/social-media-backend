const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

const setPost = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a text");
  }

  const post = await Post.create({
    userId: req.body.userId,
    text: req.body.text,
  });

  res.send(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  res.json({
    id: req.params.id,
  });
});

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
};
