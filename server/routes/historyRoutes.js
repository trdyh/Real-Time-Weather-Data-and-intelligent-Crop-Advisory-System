const express = require("express");
const SearchHistory = require("../models/SearchHistory");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const history = await SearchHistory.find({ userId: req.userId })
    .sort({ createdAt: -1 });

  res.json(history);
});

module.exports = router;
