function dijkstra(graph, start, end) {
  if (!graph[start] || !graph[end]) {
    throw new Error("Start or end station does not exist in the graph.");
  }

  const distances = {}, prev = {}, pq = [];
  for (const node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }

  distances[start] = 0;
  pq.push([start, 0]);

  while (pq.length) {
    pq.sort((a, b) => a[1] - b[1]);
    const [current, dist] = pq.shift();

    if (current === end) break;

    const neighbors = graph[current] || [];
    for (const [neighbor, cost] of neighbors) {
      const alt = dist + cost;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        prev[neighbor] = current;
        pq.push([neighbor, alt]);
      }
    }
  }

  let path = [];
  let node = end;
  while (node !== null) {
    path.unshift(node);
    node = prev[node];
  }

  if (distances[end] === Infinity) {
    return { path: [], distance: -1 }; // unreachable
  }

  return { path, distance: distances[end] };
}

module.exports = dijkstra;