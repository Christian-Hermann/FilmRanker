import express from "express";
import { requireUser } from "../middleware/requireUser.js";
import { getAllMovies, createMovie } from "../db/movies.js";

const router = express.Router();

let movies = [
  {
    id: 1,
    title: "Mad Max: Fury Road",
    director: "George Miller",
    genre: ["action"],
    releaseYear: 2015,
  },
  {
    id: 2,
    title: "Alien Romulus",
    director: "Fede Alvarez",
    genre: ["horror", "sci-fi"],
    releaseYear: 2024,
  },
  {
    id: 3,
    title: "The Goonies",
    director: "Richard Donner",
    genre: ["adventure"],
    releaseYear: 1985,
  },
];

router.get("/", async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.json(movies);
  } catch (err) {
    console.error("Errror getting movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", requireUser, async (req, res) => {
  try {
    const { title, director, genre, release_year } = req.body;

    const newMovie = await createMovie({
      title,
      director,
      genre,
      release_year: release_year,
      user_id: req.user.id,
    });
    res.status(201).json(newMovie);
  } catch (err) {
    console.error("Error creating movie:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", requireUser, (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  const { title, director, genre, releaseYear } = req.body;
  if (title) movie.title = title;
  if (director) movie.director = director;
  if (genre) movie.genre = genre;
  if (releaseYear) movie.releaseYear = releaseYear;

  res.json(movie);
});

router.delete("/:id", requireUser, (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movies.splice(movieIndex, 1);

  res.sendStatus(204);
});

export default router;
