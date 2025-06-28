const lines = [
  { id: 1, name: "Red Line" },
  { id: 2, name: "Blue Line" }
];

const stations = [
  { id: 1, name: "Ameerpet", lineId: 1 },
  { id: 2, name: "Hitech City", lineId: 1 },
  { id: 3, name: "Miyapur", lineId: 1 },
  { id: 4, name: "Nagole", lineId: 2 }
];

const connections = [
  { from: 1, to: 2, time: 5 },
  { from: 2, to: 3, time: 7 },
  { from: 1, to: 4, time: 10 }
];

module.exports = { lines, stations, connections };