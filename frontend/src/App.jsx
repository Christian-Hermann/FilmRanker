import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import "./styles.css";
import { deleteMovie } from "./api/movies";

const API = import.meta.env.VITE_API_URL || "https://filmranker.onrender.com";

function App() {
  const [movies, setMovies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [user]);

  async function fetchMovies() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/movies`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMovies(data);
      } else {
        console.error("Error fetching movies:", data.error);
        setMovies([]);
      }
    } catch (err) {
      console.error("Network error while fetching movies:", err);
      setMovies([]);
    }
  }

  async function handleAddMovie(newMovie) {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/movies`, {
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

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    setMovies([]);
  }

  return (
    <div className="app">
      <div className="header">
        <h1>FilmRanker</h1>

        {user && (
          <div className="row">
            <button
              className="btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancel" : "Add a new film"}
            </button>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      {!user ? (
        <>
          {showLogin ? (
            <div className="card">
              <LoginForm onLogin={setUser} />
              <p style={{ marginTop: 8 }}>
                Don't have an account?{" "}
                <button
                  className="btn btn-outline"
                  onClick={() => setShowLogin(false)}
                >
                  Register
                </button>
              </p>
            </div>
          ) : (
            <div className="card">
              <RegisterForm onRegister={setUser} />
              <p style={{ marginTop: 8 }}>
                Already have an account?{" "}
                <button
                  className="btn btn-outline"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {showAddForm && (
            <div className="card">
              <AddMovieForm onAdd={handleAddMovie} />
            </div>
          )}

          <div className="movie-list">
            <MovieList
              movies={movies}
              onDelete={handleDelete}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
