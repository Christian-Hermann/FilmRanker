function SearchBar({ onSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by director..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
