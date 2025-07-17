import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { deleteMovie } from "./api/movies";
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    title: "",
    director: "",
    genre: "",
    releaseYear: "",
  });
  const [editingMovie, setEditingMovie] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

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

  function handleEditClick(movie) {
    setEditingMovie(movie);
  }

  async function handleAddMovie(newMovie) {
    try {
      const res = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newMovie,
          genre: newMovie.genre.split(",").map((g) => g.trim().toLowerCase()),
          releaseYear: parseInt(newMovie.releaseYear),
        }),
      });

      if (!res.ok) throw new Error("Failed to add movie");

      const data = await res.json();
      setMovies((prev) => [...prev, data]);
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  }

  async function handleUpdateMovie(updatedMovie) {
    try {
      const res = await fetch(
        `http://localhost:3000/movies/${updatedMovie.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updatedMovie,
            genre: updatedMovie.genre.split(",").map((g) => g.trim()),
            releaseYear: parseInt(updatedMovie.releaseYear),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update movie");

      const data = await res.json();

      setMovies((movies) =>
        movies.map((movie) => (movie.id === data.id ? data : movie))
      );

      setEditingMovie(null);
    } catch (err) {
      console.log("Error updating movie:", err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  }

  function handleMoveUp(id) {
    setMovies((prev) => {
      const index = prev.findIndex((m) => m.id === id);
      if (index === 0) return prev;
      const newMovies = [...prev];
      [newMovies[index - 1], newMovies[index]] = [
        newMovies[index],
        newMovies[index - 1],
      ];
      return newMovies;
    });
  }

  function handleMoveDown(id) {
    setMovies((prev) => {
      const index = prev.findIndex((m) => m.id === id);
      if (index === prev.length - 1) return prev;
      const newMovies = [...prev];
      [newMovies[index + 1], newMovies[index]] = [
        newMovies[index],
        newMovies[index + 1],
      ];
      return newMovies;
    });
  }

  return (
    <div>
      <h1>FilmRanker</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Cancel" : "Add a new film"}
      </button>
      {showAddForm && <AddMovieForm onAdd={handleAddMovie} />}
      <SearchBar onSearch={setSearchTerm} />
      <MovieList
        movies={movies}
        onDelete={handleDelete}
        onEdit={handleEditClick}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />
      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onUpdate={handleUpdateMovie}
          onCancel={() => setEditingMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
