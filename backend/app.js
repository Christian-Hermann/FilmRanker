import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.js";
import authRoutes from "./api/auth.js";
import { getUserFromToken } from "./middleware/getUserFromToken.js";

const app = express();

// Middlewear
app.use(cors());
app.use(express.json());
app.use(getUserFromToken);

// Routes
app.use("/movies", moviesRouter);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("FilmRanker backend is running!!!");
});

export default app;
