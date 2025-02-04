
import { Product } from "../models/product.model.js";
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

// Get seller analytics
export const getSellerAnalytics =  async (req, res) => {
  try {
    const { sellerId } = req.params;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch total products for the seller
    const totalProducts = await Product.countDocuments({ seller_id: sellerId });

    // Fetch total orders for the seller
    const totalOrders = await prisma.order.count({
      where: { seller_id: sellerId }
    });

    // Fetch total revenue from delivered orders
    const totalRevenue = await prisma.order.aggregate({
      _sum: { price: true },
      where: { seller_id: sellerId, status: "DELIVERED" },
    });

    // Fetch active shipments (Processing or Shipped)
    const activeShipments = await prisma.order.count({
      where: { seller_id: sellerId, status: { in: ["PROCESSING", "SHIPPED"] } }
    });


    // Fetch orders per day for the last 7 days
    const ordersPerDay = await prisma.order.groupBy({
      by: ["created_at"],
      _count: { id: true },
      where: { created_at: { gte: sevenDaysAgo } },
    });

    // Fetch product category count
    const productCategories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.price || 0,
      activeShipments,
      ordersPerDay: ordersPerDay.map(order => ({
        date: order.created_at.toISOString().split("T")[0],
        count: order._count.id,
      })),
      productCategories,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getBuyerAnalytics = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const currentYear = new Date().getFullYear();

    // Active orders (Accepted)
    const activeOrders = await prisma.order.count({
      where: { buyer_id: buyerId, status: "PROCESSING" }
    });

    // Pending RFCs (assuming RFC means Request for Confirmation or similar)
    const pendingRFCs = await prisma.order.count({
      where: { buyer_id: buyerId, status: "pending" }
    });

    // In-transit orders (shipped but not delivered)
    const inTransitOrders = await prisma.order.count({
      where: { buyer_id: buyerId, status: "SHIPPED" }
    });

    // Total spend (sum of prices of all completed orders)
    const totalSpend = await prisma.order.aggregate({
      _sum: { price: true },
      where: { buyer_id: buyerId, status: "DELIVERED" },
    });

    // Purchase volume by month (quantity)
    const purchaseVolume = await prisma.order.groupBy({
      by: ["created_at"],
      _sum: { quantity: true },
      where: { buyer_id: buyerId, created_at: { gte: new Date(`${currentYear}-01-01`) } },
    });

    // Bought all different categories
    const productIds = await prisma.order.findMany({
      where: { buyer_id: buyerId },
      select: { product_id: true }
    });

    const productCategories = await Product.aggregate([
      { $match: { _id: { $in: productIds.map(p => p.product_id) } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json({
      activeOrders,
      pendingRFCs,
      inTransitOrders,
      totalSpend: totalSpend._sum.price || 0,
      purchaseVolume: purchaseVolume.map(order => ({
        month: order.created_at.toISOString().slice(0, 7),
        quantity: order._sum.quantity,
      })),
      productCategories,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
