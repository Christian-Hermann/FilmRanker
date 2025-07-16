export async function addMovie(movieData) {
  const formattedData = {
    ...movieData,
    genre: movieData.genre.split(",").map((g) => g.trim()),
    releaseYear: parseInt(movieData.releaseYear),
  };

  const res = await fetch("http://localhost:3000/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formattedData),
  });

  if (!res.ok) {
    throw newError("Failed to add movie");
  }

  return await res.json();
}
