import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.js";
import authRoutes from "./api/auth.js";
import { getUserFromToken } from "./middleware/getUserFromToken.js";

const app = express();

/* === CORS: bootcamp style (uses env var) === */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // e.g. https://filmranker-2025.netlify.app
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// keep preflight happy
app.options("*", cors({ origin: process.env.CORS_ORIGIN }));

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
