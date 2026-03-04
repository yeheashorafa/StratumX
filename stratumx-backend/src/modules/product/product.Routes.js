import express from "express";
import * as controller from "./product.Controller.js";
import { authMiddleware } from "../../middlewares/auth.js";
import { roleMiddleware } from "../../middlewares/role.js";
import { cache } from "../../middlewares/cacheMiddleware.js";
import { ROLES } from "../../constants/roles.js";

const router = express.Router();

// Public
router.get("/", cache("products"), controller.getAll);
router.get("/:id", controller.getOne);

// Admin
router.post(
  "/",
  cache("products"),
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.create,
);

router.put(
  "/:id",
  cache("products"),
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.update,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.remove,
);

export default router;
