import express from "express";
import * as orderController from "./order.Controller.js";
import { authMiddleware } from "../../middlewares/auth.js";
import { roleMiddleware } from "../../middlewares/role.js";
import { cache } from "../../middlewares/cacheMiddleware.js";

import { ROLES } from "../../constants/roles.js";

const router = express.Router();

// جميع المستخدمين المسجلين يمكنهم إنشاء checkout
// Make checkout public
router.post("/checkout", cache("orders"), orderController.checkout);
router.get("/track/:orderNumber", orderController.trackOrder);

router.use(authMiddleware);

router.get(
  "/my-orders",
  cache("orders"),
  roleMiddleware([ROLES.CUSTOMER]),
  orderController.getOrders,
);

// Admin
router.get(
  "/",
  cache("orders"),
  roleMiddleware([ROLES.ADMIN]),
  orderController.getAll,
);
router.get("/:id", roleMiddleware([ROLES.ADMIN]), orderController.getOne);
router.put(
  "/:id",
  cache("orders"),
  roleMiddleware([ROLES.ADMIN]),
  orderController.updateStatus,
);
router.delete("/:id", roleMiddleware([ROLES.ADMIN]), orderController.remove);

export default router;
