exports.addStation = async (line_id, station) => {
  const { station_name, distance_from_previous_station, station_number, is_interchange } = station;
  const res = await db.query(
    `INSERT INTO stations (station_name, line_id, distance_from_previous_station, station_number, is_interchange)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [station_name, line_id, distance_from_previous_station, station_number, is_interchange]
  );
  return res.rows[0];
};

exports.getStationsByLine = async (line_id) => {
  const res = await db.query("SELECT * FROM stations WHERE line_id = $1 ORDER BY station_number", [line_id]);
  return res.rows;
};