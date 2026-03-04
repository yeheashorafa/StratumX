import express from "express";
import * as controller from "./contact.Controller.js";
import { authMiddleware } from "../../middlewares/auth.js";
import { roleMiddleware } from "../../middlewares/role.js";
import { ROLES } from "../../constants/roles.js";

const router = express.Router();

// Public (Anyone can send a message)
router.post("/", controller.create);

// Admin Only
router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.getAll,
);

router.put(
  "/:id/read",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  controller.updateStatus,
);

export default router;
