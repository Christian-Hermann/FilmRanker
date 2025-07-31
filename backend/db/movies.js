import { pool } from "./index.js";

// GET ALL MOVIES
export async function getAllMovies() {
  const result = await pool.query("SELECT * FROM movies");

  const movies = result.rows.map((movie) => ({
    ...movie,
    releaseYear: movie.release_year,
  }));

  return movies;
}

// CREATING A NEW MOVIE
export async function createMovie({
  title,
  director,
  genre,
  releaseYear,
  user_id,
}) {
  const result = await pool.query(
    `
    INSERT INTO movies (title, director, genre, release_year, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [title, director, genre, releaseYear, user_id]
  );

  return {
    ...result.rows[0],
    releaseYear: result.rows[0].release_year,
  };
}
