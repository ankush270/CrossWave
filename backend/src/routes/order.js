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
router.post("/create", verifyBuyer, createOrder);

router.get("/:orderId", getOrderById);
router.get("/user/:userId", getOrdersByUserIdAndRole);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

export default router;
