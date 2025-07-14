import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await fetch("http://localhost:3000/movies");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.log("Error fetching movies:", err);
      }
    }

    getMovies();
  }, []);

  return (
    <div>
      <h1>FilmRanker</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
