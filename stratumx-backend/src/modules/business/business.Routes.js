// src/modules/business/business.Routes.js
import express from "express";
import {
  createBusinessController,
  getBusinessesController,
  getBusinessByIdController,
  updateBusinessController,
  deleteBusinessController
} from "./business.Controller.js";

import { authMiddleware, adminOnly } from "../../middlewares/auth.js";
import { cache } from "../../middlewares/cacheMiddleware.js";

const router = express.Router();

// Public vs Admin access
router.post("/",cache("businesses"), authMiddleware, adminOnly, createBusinessController);
router.get("/",cache("businesses"), authMiddleware, adminOnly, getBusinessesController);
router.get("/:id",cache("businesses"), authMiddleware, adminOnly, getBusinessByIdController);
router.put("/:id",cache("businesses"), authMiddleware, adminOnly, updateBusinessController);
router.delete("/:id",cache("businesses"), authMiddleware, adminOnly, deleteBusinessController);

export default router;