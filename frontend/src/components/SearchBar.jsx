function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onSearch((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <input
        type="text"
        name="director"
        placeholder="Search by director"
        onChange={handleChange}
      />
      <input
        type="text"
        name="genre"
        placeholder="Search by genre"
        onChange={handleChange}
      />
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
