const stationModel = require("../models/stationModel");

exports.addStation = async (req, res) => {
  const line_id = parseInt(req.params.line_id);
  try {
    const station = await stationModel.addStation(line_id, req.body);
    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStationsByLine = async (req, res) => {
  const line_id = parseInt(req.params.line_id);
  try {
    const stations = await stationModel.getStationsByLine(line_id);
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStations = async (req, res) => {
  try {
    const stations = await stationModel.getAllStations();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};