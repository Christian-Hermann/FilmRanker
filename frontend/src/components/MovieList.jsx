import { useState } from "react";

function MovieList({ movies, onDelete, onMoveUp, onMoveDown }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="card">
          <div className="title">
            {movie.title} {movie.releaseYear ? `(${movie.releaseYear})` : ""}
          </div>
          <div className="meta">Directed by {movie.director}</div>
          <div className="meta">
            Genre:{" "}
            {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
          </div>

          <div className="row" style={{ marginTop: 8 }}>
            <button
              className="btn btn-outline"
              onClick={() => onMoveUp(movie.id)}
            >
              ↑
            </button>
            <button
              className="btn btn-outline"
              onClick={() => onMoveDown(movie.id)}
            >
              ↓
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(movie.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default MovieList;
