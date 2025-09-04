import "dotenv/config";
import { pool } from "./index.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    const sqlPath = path.join(__dirname, "schema.sql");
    const sql = await fs.readFile(sqlPath, "utf8");
    await pool.query(sql);
    console.log("✅ Applied schema.sql successfully");
  } catch (err) {
    console.error("❌ Error applying schema.sql:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}
main();
