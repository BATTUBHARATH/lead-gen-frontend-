const lineModel = require("../models/lineModel");

exports.createLine = async (req, res) => {
  try {
    const line = await lineModel.createLine(req.body);
    res.status(201).json(line);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLines = async (req, res) => {
  try {
    const lines = await lineModel.getAllLines();
    res.json(lines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLineById = async (req, res) => {
  const id = parseInt(req.params.line_id);
  try {
    const line = await lineModel.getLineById(id);
    if (line) {
      res.json(line);
    } else {
      res.status(404).json({ error: "Line not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLine = async (req, res) => {
  const id = parseInt(req.params.line_id);
  try {
    const updated = await lineModel.updateLine(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLine = async (req, res) => {
  const id = parseInt(req.params.line_id);
  try {
    await lineModel.deleteLine(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};