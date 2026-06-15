require("dotenv").config(); // load variables from .env into process.env

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const methodOverride = require("method-override");
const path = require("path");
const fs = require("fs");
const movieController = require("./controllers/movieController");

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
// Each handler lives in controllers/movieController.js

app.get("/", movieController.index);                                  // list all movies
app.get("/movies/new", movieController.newForm);                      // add-movie form
app.post("/movies", upload.single("poster"), movieController.create); // create movie
app.get("/movies/:id", movieController.show);                         // movie details
app.get("/movies/:id/edit", movieController.editForm);                // edit-movie form
app.put("/movies/:id", upload.single("poster"), movieController.update);   // update movie
app.delete("/movies/:id", movieController.destroy);                   // delete movie

// ---------- Start server ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
