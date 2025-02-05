import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserIdAndRole,
  updateOrder,
  deleteOrder,
  getAllOrders
} from "../controllers/order.js";
import { verifyBuyer } from "../middlewares/order.js";

const router = express.Router();

// Apply `verifyBuyer` middleware before `createOrder`
router.post("/", createOrder);
// router.post("/", verifyBuyer, createOrder);

router.get("/:sellerId", getOrderById);
router.get('/all-orders', getAllOrders);
router.put("/:orderId", updateOrder);
router.get("/user/:userId", getOrdersByUserIdAndRole);
router.delete("/:orderId", deleteOrder);


export default router;
