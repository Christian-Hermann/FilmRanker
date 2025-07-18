import express from "express";

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

router.get("/", (req, res) => {
  const { title, director, genre, releaseYear } = req.query;
  let filteredMovies = movies;
  if (director) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.director.toLowerCase().includes(director.toLowerCase());
    });
  }

  if (title) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(title.toLowerCase());
    });
  }

  if (genre) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.genre.some((g) => {
        return g.toLowerCase().includes(genre.toLowerCase());
      });
    });
  }
  if (releaseYear) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.releaseYear === parseInt(releaseYear)
    );
  }
  res.json(filteredMovies);
});

router.post("/", (req, res) => {
  const { title, director, genre, releaseYear } = req.body;
  const newMovie = {
    id: movies.length + 1,
    title,
    director,
    genre,
    releaseYear,
  };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movies.splice(movieIndex, 1);

  res.sendStatus(204);
});

export default router;
