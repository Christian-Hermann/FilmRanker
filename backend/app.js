import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.js";

const app = express();

// Middlewear
app.use(cors());
app.use(express.json());
app.use("/movies", moviesRouter);

// Routes
app.get("/", (req, res) => {
  res.send("FilmRanker backend is running!!!");
});

export default app;
