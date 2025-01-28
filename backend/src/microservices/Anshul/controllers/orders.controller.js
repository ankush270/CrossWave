import { Order } from "../models/order.model.js";
import { Review } from "../models/review.model.js";

export const createOrder = async (req, res, next) => {
  const {
    buyer_id,
    seller_id,
    product_id,
    quote_id,
    logistics_id,
    payment_id,
    quantity,
    price,
    shiping_address,
    billing_address,
  } = req.body;

  if (
    !buyer_id ||
    !seller_id ||
    !product_id ||
    !quote_id ||
    !logistics_id ||
    !payment_id ||
    !quantity ||
    !price ||
    !shiping_address ||
    !billing_address
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const order = new Order({
      buyer_id,
      seller_id,
      product_id,
      quote_id,
      logistics_id,
      payment_id,
      quantity,
      price,
      shiping_address,
      billing_address,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const review = (req, res) => {
  const { reviewer_id, description } = req.body;
  if (!description)
    return res.status(400).json({ message: "Missing required fields" });

  const review = new Review({
    description,
    reviewer_id,
  });
  review.save();
  res.status(201).json(review);
};

export const getOrdersForBuyer = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer_id: req.params.buyer_id });
    if (!orders || orders.length == 0)
      return res.status(404).json({ message: "No orders found" });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrdersForSeller = async (req, res, next) => {
  try {
    const orders = await Order.find({ seller_id: req.params.seller_id });
    if (!orders || orders.length == 0)
      return res.status(404).json({ message: "No orders found" });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
