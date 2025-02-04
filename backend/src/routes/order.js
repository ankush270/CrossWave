import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserIdAndRole,
  updateOrder,
  deleteOrder,
} from "../controllers/order.js";
import { verifyBuyer } from "../middlewares/order.js";

const router = express.Router();

// Apply `verifyBuyer` middleware before `createOrder`
router.post("/order", verifyBuyer, createOrder);

router.get("/order/:orderId", getOrderById);
router.get("/order/user/:userId", getOrdersByUserIdAndRole);
router.put("/order/:orderId", updateOrder);
router.delete("/order/:orderId", deleteOrder);

export default router;
