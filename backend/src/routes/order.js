import express from "express";
import {
  createOrder,
  getOrderBySellerId,
  getOrdersByUserIdAndRole,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrderByBuyerId,
} from "../controllers/order.js";
import { verifyUser } from "../middlewares/order.js";

const router = express.Router();

// Apply `verifyUser` middleware before `createOrder`
router.post("/", createOrder);
// router.post("/", verifyUser, createOrder);

router.get("/get/all-orders", getAllOrders);
router.get("/:sellerId", getOrderBySellerId);
router.get("/get-buyer-order/:buyerId", getOrderByBuyerId);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);
router.get("/user/:userId", getOrdersByUserIdAndRole);

export default router;
