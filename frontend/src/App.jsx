import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import AddMovieForm from "./components/AddMovieForm";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { deleteMovie } from "./api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    title: "",
    director: "",
    genre: "",
    releaseYear: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [searchTerm]);

  async function fetchMovies() {
    try {
      const query = new URLSearchParams(searchTerm).toString();
      const res = await fetch(`http://localhost:3000/movies?${query}`);
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.log("Error fetching movies:", err);
    }
  }

  async function handleAddMovie(newMovie) {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  async function handleAddGenre(movieId, newGenre) {
    const token = localStorage.getItem("token");
    const movie = movies.find((m) => m.id === movieId);

    if (!movie || !newGenre) return;

    const updatedGenres = [
      ...new Set([...movie.genre, newGenre.toLowerCase()]),
    ];

    try {
      const res = await fetch(`http://localhost:3000/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...movie,
          genre: updatedGenres,
          releaseYear: parseInt(movie.releaseYear),
        }),
      });

      if (!res.ok) throw new Error("Failed to update genres");

      const data = await res.json();

      setMovies((prev) => prev.map((m) => (m.id === data.id ? data : m)));
    } catch (err) {
      console.error("Error adding genre:", err);
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

      {!user ? (
        <>
          {showLogin ? (
            <>
              <LoginForm onLogin={setUser} />
              <p>
                Don't have an account?{" "}
                <button onClick={() => setShowLogin(false)}>Register</button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm onRegister={setUser} />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowLogin(true)}>Login</button>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={() => setUser(null)}>Logout</button>

          <button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel" : "Add a new film"}
          </button>

          {showAddForm && <AddMovieForm onAdd={handleAddMovie} />}

          <SearchBar onSearch={setSearchTerm} />

          <MovieList
            movies={movies}
            onDelete={handleDelete}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onAddGenre={handleAddGenre}
          />
        </>
      )}
    </div>
  );
}

export default App;
