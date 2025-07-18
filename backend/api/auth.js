import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const users = [];
const JWT_SECRET = "supersecret";

// POST auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // check for existing auth
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // create user object
  const newUser = { id: users.length + 1, username, passwordHash };
  users.push(newUser);

  // create token
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    JWT_SECRET
  );
  res.json({ token, user: { id: newUser.id, username: newUser.username } });
});

// POST auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token, user: { id: user.id, username: user.username } });
});

export default router;
