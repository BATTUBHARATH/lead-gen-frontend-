const express = require("express");
const app = express();
app.use(express.json()); //  Required to read JSON POST bodies

const lineRoutes = require("./routes/lineRoutes");
const stationRoutes = require("./routes/stationRoutes");
const routeRoutes = require("./routes/routeRoutes"); //  This must be here

// Mount routes
app.use("/api/lines", lineRoutes);
app.use("/api/stationRoutes", stationRoutes);
app.use("/api/route", routeRoutes); //  This enables /api/route/find

module.exports = app;
