
import { Product } from "../models/product.model.js";
import prisma from "../config/prisma_db.js";

export const getSellerAnalytics = async (req, res) => {
  try {
    const sellerId = req.id;
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6); // ✅ Adjust to get last 7 days correctly

    // Fetch total products for the seller
    const totalProducts = await Product.countDocuments({ seller_id: sellerId });

    // Fetch total orders for the seller
    const totalOrders = await prisma.order.count({
      where: { seller_id: sellerId },
    });

    // Fetch total revenue from delivered orders
    const totalRevenue = await prisma.order.aggregate({
      _sum: { price: true },
      where: { seller_id: sellerId, status: "DELIVERED" },
    });

    // Fetch active shipments (Processing or Shipped)
    const activeShipments = await prisma.order.count({
      where: { seller_id: sellerId, status: { in: ["PROCESSING", "SHIPPED"] } },
    });

    // Fetch orders per day for the last 7 days using the correct table name "orders"
    const rawOrdersPerDay = await prisma.$queryRaw`
      SELECT DATE(created_at) as date, COUNT(id) as count 
      FROM "orders"
      WHERE seller_id = ${sellerId} AND created_at >= ${sevenDaysAgo}
      GROUP BY date
      ORDER BY date ASC;
    `;

    console.log("🔍 Raw Orders Per Day Query Result:", rawOrdersPerDay);

    // Convert query result into a map for fast lookup
    const ordersMap = new Map(rawOrdersPerDay.map(order => [order.date.toISOString().split("T")[0], order.count]));

    // Generate last 7 days correctly
    const ordersPerDay = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(sevenDaysAgo.getDate() + i); // ✅ Ensures correct iteration from `sevenDaysAgo`
      const dateString = date.toISOString().split("T")[0];

      ordersPerDay.push({ date: dateString, count: ordersMap.get(dateString) || 0 });
    }

    console.log("📊 Final Orders Per Day:", ordersPerDay);

    // Fetch product category count
    const productCategories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.price || 0,
      activeShipments,
      ordersPerDay,
      productCategories,
    });

  } catch (error) {
    console.error("❌ Error in getSellerAnalytics:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getBuyerAnalytics = async (req, res) => {
  try {
    const buyerId = req.id;
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
