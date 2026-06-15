const mongoose = require("mongoose");

// Schema = structure of a movie document stored in MongoDB
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },     // movie name
    director: { type: String },                  // who directed it
    genre: { type: String },                     // action, drama, etc.
    year: { type: Number },                      // release year
    rating: { type: Number, min: 0, max: 10 },   // 0 - 10 scale
    description: { type: String },               // short plot summary
    poster: { type: String },                    // filename of uploaded poster image
  },
  { timestamps: true } // auto adds createdAt / updatedAt
);

module.exports = mongoose.model("Movie", movieSchema);
