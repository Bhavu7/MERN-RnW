// Movie controller: holds all the request-handling logic for movie routes.
const path = require("path");
const fs = require("fs");
const Movie = require("../models/Movie");

// uploads folder (posters live here) — same path used by multer in app.js
const uploadDir = path.join(__dirname, "..", "uploads");

// delete a poster file from disk if it exists
const removePoster = (filename) => {
  if (!filename) return;
  const file = path.join(uploadDir, filename);
  if (fs.existsSync(file)) fs.unlinkSync(file);
};

// READ: list all movies (home page)
exports.index = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.render("index", { movies });
};

// CREATE: show "add movie" form
exports.newForm = (req, res) => {
  res.render("new");
};

// CREATE: handle form submit (poster file field = "poster")
exports.create = async (req, res) => {
  const data = req.body;
  if (req.file) data.poster = req.file.filename; // save poster filename
  await Movie.create(data);
  res.redirect("/");
};

// READ: show single movie details
exports.show = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.redirect("/");
  res.render("show", { movie });
};

// UPDATE: show "edit movie" form
exports.editForm = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.redirect("/");
  res.render("edit", { movie });
};

// UPDATE: handle edit submit
exports.update = async (req, res) => {
  const data = req.body;
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.redirect("/");

  if (req.file) {
    removePoster(movie.poster); // delete old poster before saving the new one
    data.poster = req.file.filename;
  }

  await Movie.findByIdAndUpdate(req.params.id, data);
  res.redirect("/movies/" + req.params.id);
};

// DELETE: remove a movie (and its poster file)
exports.destroy = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (movie) removePoster(movie.poster);
  res.redirect("/");
};
