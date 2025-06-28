const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");

// POST /api/route/find
router.post("/find", routeController.findRoute);

module.exports = router;