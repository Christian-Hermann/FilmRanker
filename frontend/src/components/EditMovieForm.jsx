import { useState, useEffect } from "react";

function EditMovieForm({ movie, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    genre: "",
    releaseYear: "",
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        director: movie.director,
        genre: movie.genre.join(", "),
        releaseYear: movie.releaseYear,
      });
    }
  }, [movie]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!movie) return;
    onUpdate({ ...formData, id: movie.id });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Movie</h3>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="director"
        value={formData.director}
        onChange={handleChange}
        placeholder="Director"
      />
      <input
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        placeholder="Genres (comma-separated)"
      />
      <input
        type="number"
        name="releaseYear"
        value={formData.releaseYear ?? ""}
        onChange={handleChange}
        placeholder="Release Year"
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditMovieForm;
