import express from "express";
import { requireUser } from "../middleware/requireUser.js";
import { pool } from "../db/index.js";

const router = express.Router();

/**
 * GET /movies
 * Return ONLY the current user's movies.
 */
router.get("/", requireUser, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, director, genre, release_year AS "releaseYear"
       FROM movies
       WHERE user_id = $1
       ORDER BY id DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET /movies error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /movies
 * Create a movie owned by the current user.
 */
router.post("/", requireUser, async (req, res) => {
  try {
    const { title, director, genre, releaseYear } = req.body;

    const genreArray = Array.isArray(genre)
      ? genre
      : String(genre || "")
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean);

    const year =
      releaseYear == null || releaseYear === "" ? null : Number(releaseYear);

    const result = await pool.query(
      `INSERT INTO movies (title, director, genre, release_year, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, director, genre, release_year AS "releaseYear"`,
      [title, director, genreArray, year, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /movies error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * DELETE /movies/:id
 * Delete ONLY a movie that belongs to the current user.
 */
router.delete("/:id", requireUser, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await pool.query(
      `DELETE FROM movies
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /movies/:id error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
