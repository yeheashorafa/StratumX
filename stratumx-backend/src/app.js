import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Routes
import businessRoutes from "./modules/business/business.Routes.js";
import userRoutes from "./modules/user/user.Routes.js";
import categoryRoutes from "./modules/category/category.Routes.js";
import productRoutes from "./modules/product/product.Routes.js";
import serviceRoutes from "./modules/service/service.Routes.js";
import pageRoutes from "./modules/page/page.Routes.js";
import orderRoutes from "./modules/order/order.Routes.js";
import cartRoutes from "./modules/cart/cart.Routes.js";
import contactRoutes from "./modules/contact/contact.Routes.js";
import paymentRoutes from "./modules/payment/payment.Routes.js";

// Middlewares
import errorHandler from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rateLimit.js";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Serve static files
app.use("/uploads", express.static("uploads"));

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "StratumX Backend Running 🚀" });
});

// API Routes
app.use("/api/auth", apiLimiter, userRoutes);
app.use("/api/businesses", apiLimiter, businessRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/payment", paymentRoutes);

// Global error handler
app.use(errorHandler);

export default app;
