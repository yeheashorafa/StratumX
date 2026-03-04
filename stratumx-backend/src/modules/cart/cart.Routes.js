import express from "express";
import * as controller from "./cart.Controller.js";
import { authMiddleware } from "../../middlewares/auth.js";
import { roleMiddleware } from "../../middlewares/role.js";
import { ROLES } from "../../constants/roles.js";
import { cache } from "../../middlewares/cacheMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware([ROLES.CUSTOMER]));

router.get("/",cache("cart"), controller.getUserCart);
router.post("/",cache("cart"), controller.addItem);
router.put("/:itemId",cache("cart"), controller.updateItem);
router.delete("/:itemId",cache("cart"), controller.removeItem);

export default router;