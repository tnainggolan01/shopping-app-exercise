const service = require("../services/posts");

const { body, validationResult } = require("express-validator");
const validate = (method) => {
  switch (method) {
    case "add-post":
    case "put-post": {
      return [
        body("content", "Post content doesn't exists").exists(),
        body("author", "Author doesn't exists").exists(),
      ];
    }
  }
};

const getPosts = async (req, res, next) => {
  try {
    res.send(await service.getPosts());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await service.getPostById(req.params.id);

    if (post === undefined || post === null) {
      return res.status(404).send({ error: "Post not found" });
    }

    // res.json({ data: post });
    res.send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createPost = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    res.send(await service.createPost(req.body));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const post = await service.getPostById(req.params.id);

    if (post === undefined || post === null) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.send(await service.updatePost(req.params.id, req.body));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await service.getPostById(req.params.id);
    // console.log("controller/deletePost:", post);

    if (post === undefined || post === null) {
      return res.status(404).send({ error: "Post not found" });
    }
    await service.deletePost(req.params.id);
    // res.json({ data: post });
    res.send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  validate,
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
