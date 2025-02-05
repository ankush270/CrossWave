import prisma from "../config/prisma_db.js";
import { createPaymentDoc } from "./Payment.js";
import { createLogistics } from "./logistics.js";

/**
 * Create a new order
 */
export const createOrder = async (req, res) => {
  try {
    const data = req.body;
    console.log("OrderData : ", req.body);

    const order = await prisma.order.create({
      data: {
        buyer_id: data.buyer_id,
        seller_id: "0ca9db35-b652-4f73-a00c-64972696aaea",
        // seller_id: data.seller_id,
        product_id: data.product_id,
        quote_id: data.quote_id,
        // logistics_id: data.logistics_id,
        // payment_id: data.payment_id,
        quantity: data.quantity,
        price: data.price,
        status: data.status || "PENDING",
        shiping_address: data.shiping_address,
        billing_address: data.billing_address,
        contact_info: data.contact_info,
        delivery_preferences: data.delivery_preferences,
      },
    });

    const payment_details = {
      razorpayPaymentId: data.paymentId,
      razorpayOrderId: data.orderId,
      razorpaySignature: data.razorpay_signature,
      status: "PENDING",
      orderId: order.id,
      totalAmount: parseFloat(data.amount),
      currency: data.currency,
      paymentMethod: "Demo",
      taxDetails: "Demo",
      shippingCost: 1,
    };

    const payment = await createPaymentDoc(payment_details);
    console.log(payment);

    // const logistics_details = {//create logistics details
    //     }

    // const logistics = await createLogistics(logistics_details);
    console.log("ORder Created");

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.log("ERROOOOOOOOOOOOOORRRRRRRRRRR : ", error);

    res.status(500).json({
      success: false,
      error: "Error creating order: " + error.message,
    });
  }
};

/**
 * Get an order by ID
 */
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer_status: true,
        seller_status: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching order: " + error.message,
    });
  }
};

/**
 * Get orders of a user based on their role (buyer or seller)
 */
export const getOrdersByUserIdAndRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.query; // role should be 'buyer' or 'seller'

    if (!role || (role !== "buyer" && role !== "seller")) {
      return res.status(400).json({
        success: false,
        error: "Invalid role. It should be 'buyer' or 'seller'.",
      });
    }

    const filter =
      role === "buyer" ? { buyer_id: userId } : { seller_id: userId };

    const orders = await prisma.order.findMany({
      where: filter,
      include: {
        buyer_status: true,
        seller_status: true,
      },
    });

    // if (orders.length === 0) {
    //     return res.status(404).json({
    //         success: false,
    //         error: `No orders found where user is a ${role}`
    //     });
    // }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching user orders: " + error.message,
    });
  }
};

/**
 * Get all orders
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        buyer_status: true,
        seller_status: true,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching orders: " + error.message,
    });
  }
};

/**
 * Update an order
 */
export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updateData = req.body;

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error updating order: " + error.message,
    });
  }
};

/**
 * Delete an order
 */
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    await prisma.order.delete({
      where: { id: orderId },
    });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error deleting order: " + error.message,
    });
  }
};
