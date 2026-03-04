import express from "express";
import * as controller from "./category.Controller.js";
import { authMiddleware } from "../../middlewares/auth.js";
import { roleMiddleware } from "../../middlewares/role.js";
import { ROLES } from "../../constants/roles.js";
import { cache } from "../../middlewares/cacheMiddleware.js";

const router = express.Router();

// Public
router.get("/",cache("categories"), controller.getAll);

// Admin
router.post(
  "/",
  cache("categories"),
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.create
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.remove
);

export default router;