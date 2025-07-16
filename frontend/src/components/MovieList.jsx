function MovieList({ movies, onDelete }) {
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
          <button onClick={() => onDelete(movie.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
