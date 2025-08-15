import { useState } from "react";

function AddMovieForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    genre: "",
    releaseYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, director, genre, releaseYear } = formData;
    if (!title || !director || !genre || !releaseYear) {
      alert("Please fill out all fields.");
      return;
    }
    onAdd({
      ...formData,
      releaseYear: releaseYear ? parseInt(releaseYear) : null,
    });
    setFormData({ title: "", director: "", genre: "", releaseYear: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        placeholder="Genre (comma-separated)"
      />
      <input
        name="releaseYear"
        value={formData.releaseYear}
        onChange={handleChange}
        placeholder="Release Year"
      />
      <button type="submit" className="btn">
        Add Film
      </button>
    </form>
  );
}

export default AddMovieForm;
