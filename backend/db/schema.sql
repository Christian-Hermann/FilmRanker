CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT NOT NULL,
  genre TEXT[] NOT NULL,
  release_year INTEGER,
  user_id INTEGER REFERENCES users(id)
);

-- Helpful index so user-specific queries are fast
CREATE INDEX IF NOT EXISTS idx_movies_user_id ON movies(user_id);
