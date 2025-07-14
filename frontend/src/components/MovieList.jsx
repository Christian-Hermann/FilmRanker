function MovieList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          {movie.title} ({movie.releaseYear})
          <br />
          Directed by {movie.director}
          <br />
          Genre: {movie.genre.join(", ")}
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
