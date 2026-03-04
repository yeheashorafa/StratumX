import express from "express";
import * as controller from "./page.Controller.js";
import { authMiddleware } from "../../middlewares/auth.js";
import { roleMiddleware } from "../../middlewares/role.js";
import { cache } from "../../middlewares/cacheMiddleware.js";
import { ROLES } from "../../constants/roles.js";

const router = express.Router();

// Public
router.get("/", cache("pages"), controller.getAll);

// Admin
router.post(
  "/",
  cache("pages"),
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.create,
);
router.put(
  "/:id",
  cache("pages"),
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.update,
);
router.delete(
  "/:id",
  cache("pages"),
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.remove,
);

export default router;
