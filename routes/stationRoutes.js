const express = require("express");
const router = express.Router();
const stationModel = require("../models/stationModel");

// POST /api/lines/:line_id/stations
router.post("/:line_id/stations", async (req, res) => {
  const line_id = parseInt(req.params.line_id);
  try {
    const station = await stationModel.addStation(line_id, req.body);
    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/lines/:line_id/stations
router.get("/:line_id/stations", async (req, res) => {
  const line_id = parseInt(req.params.line_id);
  try {
    const stations = await stationModel.getStationsByLine(line_id);
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;