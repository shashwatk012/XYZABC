const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// ============================================
// DANGER ZONE: CLEAR ALL DATA
// ============================================

// ✅ 1. Clear All Orders
const clearAllOrders = async (req, res) => {
  try {
    console.log("🗑️  Clearing all orders...");

    const result = await Order.deleteMany({});

    console.log(`✅ Deleted ${result.deletedCount} orders`);

    res.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} orders`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error clearing orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear orders",
      error: error.message,
    });
  }
};

// ✅ 2. Clear All Products
const clearAllProducts = async (req, res) => {
  try {
    console.log("🗑️  Clearing all products...");

    const result = await Product.deleteMany({});

    console.log(`✅ Deleted ${result.deletedCount} products`);

    res.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} products`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error clearing products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear products",
      error: error.message,
    });
  }
};

// ✅ 3. Clear All Users (EXCEPT ADMINS)
const clearAllUsers = async (req, res) => {
  try {
    console.log("🗑️  Clearing all users (except admins)...");

    // Delete all users except admins
    const result = await User.deleteMany({
      isAdmin: { $ne: true },
    });

    console.log(`✅ Deleted ${result.deletedCount} users (kept admins)`);

    res.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} users (admins preserved)`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error clearing users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear users",
      error: error.message,
    });
  }
};

// ✅ 4. Clear EVERYTHING (NUCLEAR OPTION)
const clearAllData = async (req, res) => {
  try {
    console.log("☢️  CLEARING ALL DATA (NUCLEAR OPTION)...");

    // Confirmation check
    const { confirmationCode } = req.body;
    if (confirmationCode !== "DELETE_ALL_DATA_PERMANENTLY") {
      return res.status(400).json({
        success: false,
        message: "Invalid confirmation code. Data deletion aborted.",
      });
    }

    const results = {
      orders: 0,
      products: 0,
      users: 0,
    };

    // Delete orders
    const ordersResult = await Order.deleteMany({});
    results.orders = ordersResult.deletedCount;

    // Delete products
    const productsResult = await Product.deleteMany({});
    results.products = productsResult.deletedCount;

    // Delete users (except admins)
    const usersResult = await User.deleteMany({
      isAdmin: { $ne: true },
    });
    results.users = usersResult.deletedCount;

    console.log("✅ All data cleared:", results);

    res.json({
      success: true,
      message: "All data cleared successfully (admins preserved)",
      results: results,
      totalDeleted: results.orders + results.products + results.users,
    });
  } catch (error) {
    console.error("❌ Error clearing all data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear all data",
      error: error.message,
    });
  }
};

// ✅ 5. Clear Orders by Status
const clearOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status parameter required",
      });
    }

    console.log(`🗑️  Clearing orders with status: ${status}...`);

    const result = await Order.deleteMany({ orderStatus: status });

    console.log(`✅ Deleted ${result.deletedCount} orders`);

    res.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} ${status} orders`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error clearing orders by status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear orders",
      error: error.message,
    });
  }
};

// ✅ 6. Clear Old Orders (older than X days)
const clearOldOrders = async (req, res) => {
  try {
    const { days } = req.query;
    const daysOld = parseInt(days) || 30;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    console.log(`🗑️  Clearing orders older than ${daysOld} days...`);
    console.log(`   Cutoff date: ${cutoffDate}`);

    const result = await Order.deleteMany({
      createdAt: { $lt: cutoffDate },
    });

    console.log(`✅ Deleted ${result.deletedCount} old orders`);

    res.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} orders older than ${daysOld} days`,
      deletedCount: result.deletedCount,
      cutoffDate: cutoffDate,
    });
  } catch (error) {
    console.error("❌ Error clearing old orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear old orders",
      error: error.message,
    });
  }
};

// ✅ 7. Clear Test Orders (orders with test payment IDs)
const clearTestOrders = async (req, res) => {
  try {
    console.log("🗑️  Clearing test orders...");

    // Delete orders with test payment IDs or sandbox payments
    const result = await Order.deleteMany({
      $or: [
        { cashfreeOrderId: { $regex: /^order_mock_/i } },
        { sabpaisaOrderId: { $regex: /^sabp_/i } },
        { paymentSessionId: { $regex: /test|sandbox/i } },
        { totalPrice: { $lt: 10 } }, // Orders less than ₹10
      ],
    });

    console.log(`✅ Deleted ${result.deletedCount} test orders`);

    res.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} test orders`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error clearing test orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear test orders",
      error: error.message,
    });
  }
};

// ✅ 8. Get Database Statistics (before cleanup)
const getDatabaseStats = async (req, res) => {
  try {
    const stats = {
      orders: await Order.countDocuments(),
      products: await Product.countDocuments(),
      users: await User.countDocuments(),
      admins: await User.countDocuments({ isAdmin: true }),
      deliveryBoys: await User.countDocuments({ isDeliveryBoy: true }),
      ordersByStatus: {
        pending: await Order.countDocuments({ orderStatus: "pending" }),
        orderPlaced: await Order.countDocuments({
          orderStatus: "Order Placed",
        }),
        confirmed: await Order.countDocuments({ orderStatus: "confirmed" }),
        processing: await Order.countDocuments({ orderStatus: "processing" }),
        shipped: await Order.countDocuments({ orderStatus: "shipped" }),
        delivered: await Order.countDocuments({ orderStatus: "delivered" }),
        cancelled: await Order.countDocuments({ orderStatus: "cancelled" }),
      },
      paymentsByStatus: {
        pending: await Order.countDocuments({ paymentStatus: "pending" }),
        completed: await Order.countDocuments({ paymentStatus: "completed" }),
        failed: await Order.countDocuments({ paymentStatus: "failed" }),
      },
    };

    res.json({
      success: true,
      stats: stats,
    });
  } catch (error) {
    console.error("❌ Error getting database stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get database stats",
      error: error.message,
    });
  }
};

module.exports = {
  clearAllOrders,
  clearAllProducts,
  clearAllUsers,
  clearAllData,
  clearOrdersByStatus,
  clearOldOrders,
  clearTestOrders,
  getDatabaseStats,
};
