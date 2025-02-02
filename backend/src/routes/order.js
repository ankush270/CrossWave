import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserIdAndRole,
  updateOrder,
  deleteOrder,
} from "../controllers/order.js";
import { verifyBuyer } from "../middlewares/verifyBuyer.js";

const router = express.Router();

// Apply `verifyBuyer` middleware before `createOrder`
router.post("/orders", verifyBuyer, createOrder);

router.get("/orders/:orderId", getOrderById);
router.get("/orders/user/:userId", getOrdersByUserIdAndRole);
router.put("/orders/:orderId", updateOrder);
router.delete("/orders/:orderId", deleteOrder);

export default router;
