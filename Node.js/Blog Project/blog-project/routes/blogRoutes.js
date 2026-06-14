const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");

/* Read All */
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.render("index", { blogs });
});

/* Create Form */
router.get("/create", (req, res) => {
  res.render("create");
});

/* Create Blog */
router.post("/create", async (req, res) => {
  await Blog.create(req.body);

  res.redirect("/");
});

/* Single Blog */
router.get("/blog/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  res.render("show", { blog });
});

/* Edit Form */
router.get("/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  res.render("edit", { blog });
});

/* Update */
router.put("/edit/:id", async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);

  res.redirect("/");
});

/* Delete */
router.delete("/delete/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.redirect("/");
});

module.exports = router;