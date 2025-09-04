import app from "./app.js";

// --- BEGIN: auto-apply schema once on boot (super simple) ---
import { pool } from "./db/index.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function applySchemaOnBoot() {
  try {
    const sqlPath = path.join(__dirname, "db", "schema.sql");
    const sql = await fs.readFile(sqlPath, "utf8");
    await pool.query(sql);
    console.log("✅ schema.sql applied");
  } catch (e) {
    console.log("⚠️ schema apply skipped/failed:", e.message);
    // Not fatal — server will still start
  }
}
await applySchemaOnBoot();
// --- END ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
