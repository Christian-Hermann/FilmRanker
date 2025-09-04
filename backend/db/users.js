import { pool } from "./index.js";

async function ensureTables() {
  await pool.query(`
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
    CREATE INDEX IF NOT EXISTS idx_movies_user_id ON movies(user_id);
  `);
}

export async function createUser({ username, passwordHash }) {
  await ensureTables();
  const result = await pool.query(
    `INSERT INTO users (username, password_hash)
     VALUES ($1, $2)
     RETURNING id, username`,
    [username, passwordHash]
  );
  return result.rows[0];
}

export async function getUserByUsername(username) {
  await ensureTables();
  const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return result.rows[0];
}
