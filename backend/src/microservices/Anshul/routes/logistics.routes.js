import {Router} from 'express';
import { cancelPickup, cancelShipment, createPickup, createShipment, getAsyncShipment, returnShipment, verifyShipment } from '../controllers/logistics.controller.js';
import { logisticsAuth } from '../middlewares/logisticsAuth.middleware.js';

const router = Router();

router.route('/create-shipment').post(logisticsAuth,createShipment)
router.route('/cancel-shipment').put(logisticsAuth,cancelShipment)
router.route('/get-async-ship').post(logisticsAuth,getAsyncShipment)
router.route('/verify-shipment').post(logisticsAuth,verifyShipment)
router.route('/return-shipment').post(logisticsAuth,returnShipment)
router.route('/create-pickup').post(logisticsAuth,createPickup)
router.route('/cancel-pickup').put(logisticsAuth,cancelPickup)

export default router;