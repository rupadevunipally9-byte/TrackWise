
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "trackuser",
  password: "1234",
  database: "trackwise"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;