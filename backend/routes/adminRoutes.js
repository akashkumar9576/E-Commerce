const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

/* ================= ADMIN DASHBOARD ================= */

router.get("/dashboard", authMiddleware, adminMiddleware, async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    let totalRevenue = 0;

    orders.forEach(order => {
      totalRevenue += order.totalPrice;
    });

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;