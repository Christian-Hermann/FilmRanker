const API = import.meta.env.VITE_API_URL; // from Netlify env
const BASE_URL = `${API}/movies`;

export async function getAllMovies() {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return await res.json();
}

export async function addMovie(movieData) {
  const token = localStorage.getItem("token");

  const formattedData = {
    ...movieData,
    // your DB uses TEXT[] → send an array
    genre: movieData.genre.split(",").map((g) => g.trim()),
    // number or null is fine
    releaseYear:
      movieData.releaseYear === "" || movieData.releaseYear == null
        ? null
        : parseInt(movieData.releaseYear),
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formattedData),
  });

  if (!res.ok) {
    throw new Error("Failed to add movie");
  }

  return await res.json();
}

export async function deleteMovie(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to delete movie");
  }
}
