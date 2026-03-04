import express from "express";
import * as userController from "./user.Controller.js";
import { cache } from "../../middlewares/cacheMiddleware.js";
import { authMiddleware } from "../../middlewares/auth.js";
import { roleMiddleware } from "../../middlewares/role.js";
import { ROLES } from "../../constants/roles.js";

const router = express.Router();

// Public
router.post("/register", cache("users"), userController.register);
router.post("/login", cache("users"), userController.login);

// Admin
router.use(authMiddleware, roleMiddleware([ROLES.ADMIN]));
router.get("/", cache("users"), userController.getAll);
router.put("/:id", cache("users"), userController.update);
router.delete("/:id", userController.remove);

export default router;
