const BASE_URL = "http://localhost:3000/movies";

export async function getAllMovies(searchParams = "") {
  const res = await fetch(`${BASE_URL}?${searchParams}`);
  return await res.json();
}

export async function addMovie(movieData) {
  const formattedData = {
    ...movieData,
    genre: movieData.genre.split(",").map((g) => g.trim().toLowerCase()),
    releaseYear: parseInt(movieData.releaseYear),
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formattedData),
  });

  if (!res.ok) {
    throw new Error("Failed to add movie");
  }

  return await res.json();
}

export async function deleteMovie(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete movie");
  }
}
