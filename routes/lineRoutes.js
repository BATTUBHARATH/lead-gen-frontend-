const express = require("express");
const router = express.Router();
const lineModel = require("../models/lineModel");

// POST /api/lines
router.post("/", async (req, res) => {
  try {
    const line = await lineModel.createLine(req.body);
    res.status(201).json(line);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/lines
router.get("/", async (req, res) => {
  try {
    const lines = await lineModel.getAllLines();
    res.json(lines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;