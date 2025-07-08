// backend/app.js

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FilmRanker backend is running!!!");
});

export default app;
