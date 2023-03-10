const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const User = require("../models/userModel");

// @desc Get posts from user
// @route GET /api/posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
  console.log(req.user);
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json(posts);
});

// @desc Set post
// @route POST /api/posts
// @access Private
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a text");
  }

  const post = await Post.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.send(post);
});

// desc Update post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(updatedPost);
});

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not autorized");
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
