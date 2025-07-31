import { useState } from "react";

function MovieList({ movies, onDelete, onMoveUp, onMoveDown, onAddGenre }) {
  const [genreInputs, setGenreInputs] = useState({});

  function handleGenreChange(id, value) {
    setGenreInputs((prev) => ({ ...prev, [id]: value }));
  }

  function handleAddGenreClick(id) {
    const newGenre = genreInputs[id]?.trim();
    if (!newGenre) return;

    onAddGenre(id, newGenre);
    setGenreInputs((prev) => ({ ...prev, [id]: "" }));
  }

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
          <input
            type="text"
            placeholder="Add genre"
            value={genreInputs[movie.id] || ""}
            onChange={(e) => handleGenreChange(movie.id, e.target.value)}
          />
          <button onClick={() => handleAddGenreClick(movie.id)}>
            + Add Genre
          </button>
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
