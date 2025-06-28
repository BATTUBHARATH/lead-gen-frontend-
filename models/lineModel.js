const db = require("./db");

exports.createLine = async ({ line_name, line_code, color }) => {
  const res = await db.query(
    "INSERT INTO lines (line_name, line_code, color) VALUES ($1, $2, $3) RETURNING *",
    [line_name, line_code, color]
  );
  return res.rows[0];
};

exports.getAllLines = async () => {
  const res = await db.query("SELECT * FROM lines");
  return res.rows;
};