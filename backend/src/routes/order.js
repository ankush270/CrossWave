import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserIdAndRole,
  updateOrder,
  deleteOrder,
} from "../controllers/order.js";
import { verifyUser } from "../middlewares/order.js";

const router = express.Router();

// Apply `verifyUser` middleware before `createOrder`
router.post("/", createOrder);
// router.post("/", verifyUser, createOrder);

router.get("/:orderId", getOrderById);
router.get("/user/:userId", getOrdersByUserIdAndRole);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

export default router;
