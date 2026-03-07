import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import prisma from "./config/db.js";
import { connectRedis } from "./redis/redisClient.js";

const PORT = process.env.PORT || 5000;

const verifyDatabase = async () => {
  try {
    await prisma.$queryRaw`SELECT 1 FROM orders LIMIT 1`;
  } catch (err) {
    const url = process.env.DATABASE_URL || "";
    const dbHost = url.match(/@([^/]+)/)?.[1] || "unknown";
    console.warn(`
⚠️  DATABASE WARNING: The 'orders' table does not exist.
    /api/orders will return 500. Render may be using the WRONG database.

    Current DB host: ${dbHost}

    FIX: Render Dashboard → Web Service → Environment
    Set DATABASE_URL = Railway MySQL URL
    (Railway Dashboard → MySQL → Connect → copy connection string)
`);
  }
};

const startServer = async () => {
  try {
    await verifyDatabase();
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`🚀 StratumX Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start StratumX ", error);
    process.exit(1);
  }
};

startServer();
