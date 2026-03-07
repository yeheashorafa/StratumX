import client from "../redis/redisClient.js";

/**
 * Cache middleware using node-redis (src/redis/redisClient.js)
 */
export const cache = (keyPrefix) => async (req, res, next) => {
  // Only cache GET requests
  if (req.method !== "GET") return next();

  const key = `${keyPrefix}:${req.originalUrl}`;

  try {
    // 1. Check if client is open/connected
    if (client.isOpen) {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
    }

    // 2. Override res.json to capture the response and cache it
    const originalJson = res.json.bind(res);

    res.json = async (body) => {
      // Execute the original response first so the user doesn't wait for cache write
      originalJson(body);

      // Attempt to cache in the background
      try {
        if (client.isOpen && body) {
          // Use node-redis syntax: set(key, value, { EX: seconds })
          await client.set(key, JSON.stringify(body), { EX: 60 });
        }
      } catch (cacheErr) {
        console.error("❌ Redis set error (Ignored):", cacheErr);
      }
    };

    next();
  } catch (err) {
    console.error("❌ Redis cache middleware error (Safe skip):", err);
    next();
  }
};
