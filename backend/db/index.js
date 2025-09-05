import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

const ssl =
  connectionString &&
  (connectionString.includes("ssl=true") ||
    connectionString.includes("sslmode=require"))
    ? { rejectUnauthorized: false }
    : false;

export const pool = new Pool({ connectionString, ssl });
