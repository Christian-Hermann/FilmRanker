import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function getUserFromToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = null;
    return next();
  }
  const token = authHeader.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
  } catch (err) {
    req.user = null;
  }

  next();
}
