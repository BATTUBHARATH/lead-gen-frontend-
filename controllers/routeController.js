const db = require("../models/db");
const dijkstra = require("../utils/dijkstra");

exports.findRoute = async (req, res) => {
  const { source, destination } = req.body;

  try {
    // Fetch all stations and connections
    const stationData = await db.query(
      `SELECT s1.station_name AS from_station, s2.station_name AS to_station, s2.distance_from_previous_station AS distance
       FROM stations s1
       JOIN stations s2 ON s1.line_id = s2.line_id AND s2.station_number = s1.station_number + 1`
    );

    const graph = {};
    for (const row of stationData.rows) {
      const from = row.from_station;
      const to = row.to_station;
      const dist = row.distance || 2.5;

      if (!graph[from]) graph[from] = [];
      if (!graph[to]) graph[to] = [];

      graph[from].push([to, dist]);
      graph[to].push([from, dist]);
    }

    const { path, distance } = dijkstra(graph, source, destination);

    if (path.length === 0) {
      return res.status(404).json({ error: "No route found" });
    }

    // Fare Calculation
    const baseFare = 10;
    const extraStations = Math.max(0, path.length - 3);
    const fare = baseFare + extraStations * 5;

    // Interchange Calculation
    const interchangeStations = await db.query(
      `SELECT DISTINCT station_name FROM stations WHERE is_interchange = true`
    );
    const interchanges = path.filter((station, idx, arr) =>
      idx > 0 && interchangeStations.rows.map(s => s.station_name).includes(station) && station !== arr[idx - 1]
    ).length;

    const totalFare = fare + interchanges * 2;
    const estimatedTime = (path.length - 1) * 2.5 + interchanges * 5;

    res.json({
      route: path,
      total_stations: path.length,
      interchanges,
      fare: totalFare,
      estimated_time_minutes: estimatedTime
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};