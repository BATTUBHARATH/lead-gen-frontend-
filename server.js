const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const { lines, stations, connections } = require("./data");

// List all lines
app.get("/api/lines", (req, res) => {
  res.json(lines);
});

// Add a new line
app.post("/api/lines", (req, res) => {
  const { name } = req.body;
  const newLine = { id: lines.length + 1, name };
  lines.push(newLine);
  res.status(201).json(newLine);
});

// List all stations
app.get("/api/stations", (req, res) => {
  res.json(stations);
});

// Add a new station
app.post("/api/stations", (req, res) => {
  const { name, lineId } = req.body;
  const newStation = { id: stations.length + 1, name, lineId };
  stations.push(newStation);
  res.status(201).json(newStation);
});

// List all connections
app.get("/api/connections", (req, res) => {
  res.json(connections);
});

// Add a new connection
app.post("/api/connections", (req, res) => {
  const { from, to, time } = req.body;
  const newConnection = { from, to, time };
  connections.push(newConnection);
  res.status(201).json(newConnection);
});

// Helper: Dijkstra's algorithm for shortest path
function findShortestPath(startId, endId) {
  const queue = [{ id: startId, path: [startId], time: 0, changes: 0, lastLine: null }];
  const visited = new Set();

  while (queue.length) {
    const current = queue.shift();
    if (current.id === endId) return current;

    visited.add(current.id);

    connections
      .filter(c => c.from === current.id && !visited.has(c.to))
      .forEach(c => {
        const nextStation = stations.find(s => s.id === c.to);
        const lineChange = current.lastLine && nextStation.lineId !== current.lastLine ? 1 : 0;
        queue.push({
          id: c.to,
          path: [...current.path, c.to],
          time: current.time + c.time,
          changes: current.changes + lineChange,
          lastLine: nextStation.lineId
        });
      });
  }
  return connections;
}


// GET route with query params
app.get("/api/route/find", (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "Both 'from' and 'to' query parameters are required" });
  }

  // Case-insensitive search
  const fromStation = stations.find(
    s => typeof s.name === "string" && s.name.toLowerCase() === from.toLowerCase()
  );
  const toStation = stations.find(
    s => typeof s.name === "string" && s.name.toLowerCase() === to.toLowerCase()
  );

  if (!fromStation || !toStation) {
    return res.status(400).json({ error: "Invalid station names" });
  }

  const result = findShortestPath(fromStation.id, toStation.id);

  if (!result) {
    return res.status(404).json({ error: "Route not found" });
  }

  const fare = 10 + (result.path.length - 1) * 5 + result.changes * 10;

  res.json({
    route: result.path.map(id => stations.find(s => s.id === id)?.name),
    totalStations: result.path.length,
    estimatedTime: result.time,
    lineChanges: result.changes,
    fare
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api/route/find`);
});
