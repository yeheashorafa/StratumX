import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
};

// Assuming admin ID is 1 (we can check the seed data)
const token = generateToken(1);
console.log("ADMIN_TOKEN:", token);
process.exit(0);
