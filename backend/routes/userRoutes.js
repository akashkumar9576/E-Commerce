const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// 🔐 PROTECTED ROUTE
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data access",
    userId: req.user,
  });
});

module.exports = router;