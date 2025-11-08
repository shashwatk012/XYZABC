const express = require("express");
const {
  clearAllOrders,
  clearAllProducts,
  clearAllUsers,
  clearAllData,
  clearOrdersByStatus,
  clearOldOrders,
  clearTestOrders,
  getDatabaseStats,
} = require("../controllers/adminCleanupController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ✅ ALL ROUTES REQUIRE ADMIN ACCESS
// Add this to your main server.js: app.use("/api/admin/cleanup", adminCleanupRoutes);

// ✅ Get database statistics
router.get("/stats", protect, protect, getDatabaseStats);

// ✅ Clear specific data
router.delete("/orders", protect, protect, clearAllOrders);
router.delete("/products", protect, protect, clearAllProducts);
router.delete("/users", protect, protect, clearAllUsers);

// ✅ Clear orders by status
router.delete("/orders/status/:status", protect, protect, clearOrdersByStatus);

// ✅ Clear old orders (query: ?days=30)
router.delete("/orders/old", protect, protect, clearOldOrders);

// ✅ Clear test orders
router.delete("/orders/test", protect, protect, clearTestOrders);

// ✅ NUCLEAR OPTION: Clear everything (requires confirmation)
router.post("/clear-all", protect, protect, clearAllData);

module.exports = router;
