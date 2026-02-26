const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "trackuser",
  password: "1234",
  database: "trackwise"
});

db.connect(err => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("MySQL Connected ✅");
  }
});

// ── GET ALL EXPENSES ──────────────────────────────────────────────────────────
app.get("/expenses", (req, res) => {
  const sql = "SELECT * FROM expenses ORDER BY created_at ASC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ── ADD EXPENSE ───────────────────────────────────────────────────────────────
app.post("/add-expense", (req, res) => {
  console.log("POST /add-expense body:", req.body);
  const { amount, category, note } = req.body;
  const sql = "INSERT INTO expenses (amount, category, note) VALUES (?, ?, ?)";
  db.query(sql, [amount, category, note], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ message: "Expense saved to database 🚀" });
  });
});

// ── GET TOTAL ─────────────────────────────────────────────────────────────────
app.get("/total", (req, res) => {
  const sql = "SELECT SUM(amount) AS total FROM expenses";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ total: result[0].total || 0 });
  });
});

// ── CATEGORY SUMMARY ──────────────────────────────────────────────────────────
app.get("/category-summary", (req, res) => {
  const sql = `SELECT category, SUM(amount) AS total FROM expenses GROUP BY category`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    const summary = {};
    results.forEach(row => { summary[row.category] = row.total; });
    res.json(summary);
  });
});

// ── INSIGHTS ──────────────────────────────────────────────────────────────────
app.get("/insights", (req, res) => {
  const sql = `SELECT category, SUM(amount) AS total FROM expenses GROUP BY category`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    const topCategory = results.sort((a, b) => b.total - a.total)[0];
    res.json({
      message: "Your biggest spending leak",
      category: topCategory.category,
      amount: topCategory.total
    });
  });
});

// ── DELETE EXPENSE ────────────────────────────────────────────────────────────
app.delete("/delete/:id", (req, res) => {
  db.query("DELETE FROM expenses WHERE id = ?", [req.params.id], () =>
    res.json({ message: "Deleted" })
  );
});

// ── START SERVER ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
