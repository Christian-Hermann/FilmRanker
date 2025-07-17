const genreOptions = [
  "action",
  "comedy",
  "horror",
  "drama",
  "sci-fi",
  "adventure",
  "fantasy",
  "thriller",
  "suspense",
  "foriegn",
  "romance",
  "bromance",
  "animation",
  "road-trip",
  "rom-com",
  "teen",
  "dystopian",
  "documentary",
];

function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onSearch((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        placeholder="Search by title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="director"
        placeholder="Search by director"
        onChange={handleChange}
      />
      <label>
        Genre:
        <select name="genre" onChange={handleChange}>
          <option value="">All Genres</option>
          {genreOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
      <input
        type="number"
        name="releaseYear"
        placeholder="Search by year"
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
