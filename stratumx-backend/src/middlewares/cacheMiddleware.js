import redis from "../config/redis.js";

export const cache = (keyPrefix) => async (req, res, next) => {
  const key = `${keyPrefix}:${req.originalUrl}`;
  try {
    const cached = await redis.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    res.sendResponse = res.json;
    res.json = async (body) => {
      await redis.set(key, JSON.stringify(body), "EX", 60); // cache 1 min
      res.sendResponse(body);
    };
    next();
  } catch (err) {
    console.error("Redis cache error:", err);
    next();
  }
};