import dotenv from "dotenv";
import { app } from "./app.js";
import { createServer } from "http";
import db from "./config/db.js";

dotenv.config();

async function checkDBConeection() {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("Database Connected ✅");
  } catch (err) {
    console.error("Database Error ❌", err);
  }
}

checkDBConeection();

const server = createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Server listen on port " + port);
});
