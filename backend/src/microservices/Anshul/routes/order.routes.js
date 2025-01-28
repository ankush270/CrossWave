import { Router } from "express";
import { createOrder, getOrdersForBuyer, getOrdersForSeller, updateOrderStatus } from "../microservices/demo_service_1/controllers/orders.controller.js";

const router = Router();

router.route("/addorder").post(createOrder);
router.route("/update-status/:id").put(updateOrderStatus);
router.route('/get-orders-buyer/:buyer_id').get(getOrdersForBuyer);
router.route('/get-orders-seller/:seller_id').get(getOrdersForSeller);

export default router;