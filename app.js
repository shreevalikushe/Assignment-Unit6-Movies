const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Movie = require("./schemas/movie.schema");
mongoose.connect("mongodb://127.0.0.1:27017/test");
app.use(express.json());
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({}).lean().exec();
    return res.status(201).send(movies);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// add a new movie
app.post("/movies", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).send(movie);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// get a single movie
app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean().exec();
    return res.status(201).send(movie);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// update a movie
app.patch("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send(movie);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// delete a movie
app.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).send(e);
  }
});

app.listen(1234, (req, res) => {
  console.log("listening on port 1234");
});
