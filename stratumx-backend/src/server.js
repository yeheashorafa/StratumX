import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectRedis } from "./redis/redisClient.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
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
