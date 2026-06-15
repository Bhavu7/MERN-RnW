require("dotenv").config(); // load variables from .env into process.env

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const methodOverride = require("method-override");
const path = require("path");
const fs = require("fs");
const Movie = require("./models/Movie");

const app = express();

// ---------- Database connection ----------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ---------- App config ----------
app.set("view engine", "ejs");                       // use EJS templates
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));     // parse form data
app.use(methodOverride("_method"));                  // allow PUT/DELETE via forms
app.use(express.static(path.join(__dirname, "public")));     // css
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // posters

// ---------- Multer (handles poster image upload) ----------
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir); // ensure folder exists

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  // unique filename so two posters never overwrite each other
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ---------- Routes (CRUD) ----------

// READ: list all movies (home page)
app.get("/", async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.render("index", { movies });
});

// CREATE: show "add movie" form
app.get("/movies/new", (req, res) => {
  res.render("new");
});

// CREATE: handle form submit (poster file field = "poster")
app.post("/movies", upload.single("poster"), async (req, res) => {
  const data = req.body;
  if (req.file) data.poster = req.file.filename; // save poster filename
  await Movie.create(data);
  res.redirect("/");
});

// READ: show single movie details
app.get("/movies/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.redirect("/");
  res.render("show", { movie });
});

// UPDATE: show "edit movie" form
app.get("/movies/:id/edit", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.redirect("/");
  res.render("edit", { movie });
});

// UPDATE: handle edit submit
app.put("/movies/:id", upload.single("poster"), async (req, res) => {
  const data = req.body;
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.redirect("/");

  if (req.file) {
    // delete old poster file before saving the new one
    if (movie.poster) {
      const old = path.join(uploadDir, movie.poster);
      if (fs.existsSync(old)) fs.unlinkSync(old);
    }
    data.poster = req.file.filename;
  }

  await Movie.findByIdAndUpdate(req.params.id, data);
  res.redirect("/movies/" + req.params.id);
});

// DELETE: remove a movie (and its poster file)
app.delete("/movies/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (movie && movie.poster) {
    const file = path.join(uploadDir, movie.poster);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
  res.redirect("/");
});

// ---------- Start server ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
