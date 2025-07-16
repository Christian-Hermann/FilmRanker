import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { deleteMovie } from "./api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    director: "",
    genre: "",
    releaseYear: "",
  });

  useEffect(() => {
    async function getMovies() {
      try {
        const query = new URLSearchParams(searchTerm).toString();
        const res = await fetch(`http://localhost:3000/movies?${query}`);
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.log("Error fetching movies:", err);
      }
    }

    getMovies();
  }, [searchTerm]);

  async function handleDelete(id) {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  }

  return (
    <div>
      <h1>FilmRanker</h1>
      <SearchBar onSearch={setSearchTerm} />
      <MovieList movies={movies} onDelete={handleDelete} />
    </div>
  );
}

export default App;
