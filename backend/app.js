import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.js";
import authRoutes from "./api/auth.js";

const app = express();

// Middlewear
app.use(cors());
app.use(express.json());

// Routes
app.use("/movies", moviesRouter);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("FilmRanker backend is running!!!");
});

export default app;
