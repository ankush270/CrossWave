import {Router} from 'express';
import { cancelPickup, cancelShipment, createPickup, createShipment, getAsyncShipment, returnShipment, varifyShipment } from '../controllers/logistics.controller.js';
import { shipmentAuth } from '../middlewares/shipmentAuth.middleware.js';

const router = Router();

router.route('/create-shipment').post(shipmentAuth,createShipment)
router.route('/cancel-shipment').put(shipmentAuth,cancelShipment)
router.route('/get-async-ship').post(shipmentAuth,getAsyncShipment)
router.route('/varify-shipment').post(shipmentAuth,varifyShipment)
router.route('/return-shipment').post(shipmentAuth,returnShipment)
router.route('/create-pickup').post(shipmentAuth,createPickup)
router.route('/cancel-pickup').put(shipmentAuth,cancelPickup)

export default router;