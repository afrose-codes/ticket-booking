const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ticket_db",
});

// ✅ Connect to DB
db.connect((err) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});


// ✅ TEST ROUTE (check server running)
app.get("/", (req, res) => {
  res.send("🚀 Server is working!");
});


// 🔥 1. INSERT BOOKING
app.post("/book", (req, res) => {
  const { name, email, eventName, tickets, total } = req.body;

  // Validation
  if (!name || !email || !eventName || !tickets || !total) {
    return res.status(400).send("❌ All fields required");
  }

  const sql =
    "INSERT INTO bookings (name, email, event, tickets, total) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, eventName, tickets, total], (err, result) => {
    if (err) {
      console.log("❌ Insert Error:", err);
      return res.status(500).send("Error saving booking");
    }

    console.log("✅ Booking inserted");
    res.send("Booking Saved Successfully");
  });
});


// 🔥 2. GET ALL BOOKINGS
app.get("/bookings", (req, res) => {
  const sql = "SELECT * FROM bookings";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ Fetch Error:", err);
      return res.status(500).json([]);
    }

    console.log("✅ Bookings fetched:", result.length);
    res.json(result);
  });
});


// 🔥 3. DELETE BOOKING
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("❌ Delete Error:", err);
      return res.status(500).send("Error deleting booking");
    }

    console.log("✅ Deleted booking ID:", id);
    res.send("Booking Deleted Successfully");
  });
});


// 🚀 START SERVER
app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});