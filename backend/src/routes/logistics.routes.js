import { Router } from "express";
import {
  cancelPickup,
  cancelShipment,
  createPickup,
  createShipment,
  returnShipment,
  getShipments,
} from "./../controllers/logistics.controller.js";
import { logisticsAuth } from "../middlewares/logisticsAuth.middleware.js";
// import Auth from "../middlewares/auth.js";

const router = Router();

router.route("/create-shipment").post(logisticsAuth, createShipment); //changes
router.route("/cancel-shipment").put(logisticsAuth, cancelShipment);
router.route("/return-shipment").post(logisticsAuth, returnShipment);
router.route("/shipments/:id").get(logisticsAuth, getShipments);
router.route("/create-pickup").post(logisticsAuth, createPickup);
router.route("/cancel-pickup").put(logisticsAuth, cancelPickup);

export default router;
