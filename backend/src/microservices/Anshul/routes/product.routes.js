import { Router } from "express";
import {
  addProduct,
  getProducts,
  getUserProduct,
  removeProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add-product").post(upload.array("images", 10), addProduct);
router.route("/get-product").get(getProducts);
router.route("/remove-product/:productId").delete(removeProduct);
router.route('/get-user-product/:seller').get(getUserProduct);
router.route('/update-product/:productId').put(updateProduct);

export default router;
