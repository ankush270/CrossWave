import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    const order = await prisma.order.create({
      data: {
        buyer_id,
        seller_id,
        product_id,
        quote_id,
        logistics_id,
        payment_id,
        quantity,
        price: parseFloat(price),
        shiping_address,
        billing_address,
      },
    });
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
    const order = await prisma.order.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });
    res.json(order);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Order not found" });
    }
    next(error);
  }
};

export const review = async (req, res, next) => {
  const { reviewer_id, description } = req.body;
  if (!description)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const review = await prisma.review.create({
      data: {
        description,
        reviewer_id,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getOrdersForBuyer = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { buyer_id: req.params.buyer_id },
    });
    if (!orders || orders.length === 0)
      return res.status(404).json({ message: "No orders found" });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrdersForSeller = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { seller_id: req.params.seller_id },
    });
    if (!orders || orders.length === 0)
      return res.status(404).json({ message: "No orders found" });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
