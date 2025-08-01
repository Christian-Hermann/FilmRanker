import { useState } from "react";

function MovieList({ movies, onDelete, onMoveUp, onMoveDown }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          {movie.title} ({movie.releaseYear})
          <br />
          Directed by {movie.director}
          <br />
          Genre: {movie.genre.join(", ")}
          <br />
          <button onClick={() => onMoveUp(movie.id)}>↑</button>
          <button onClick={() => onMoveDown(movie.id)}>↓</button>
          <button onClick={() => onDelete(movie.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
