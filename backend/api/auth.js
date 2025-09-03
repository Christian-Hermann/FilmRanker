import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByUsername, createUser } from "../db/users.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// POST auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // check for existing user in databse
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user in databse
    const newUser = await createUser({ username, passwordHash });

    // create JWT
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_SECRET
    );

    res.json({ token, user: { id: newUser.id, username: newUser.username } });
  } catch (err) {
    console.error("Error registeering user:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid usename or password" });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
