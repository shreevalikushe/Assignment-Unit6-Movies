const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: { type: Number },
  movie_name: { type: String, required: true },
  movie_genre: { type: String },
  production_year: { type: Number },
  budget: { type: Number },
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
