import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

// ✅ Allow frontend origins
app.use(cors({
  origin: ["http://localhost:3000", "https://bankuml.web.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: "bankuml-db.cf0keg04623e.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "bankumldb21",
  database: "bankuml_db",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to AWS RDS MySQL");
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Fetch customer by ID
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT first_name, last_name, email, date_of_birth, country, province, city, street, postal_code
    FROM Customer
    WHERE customer_id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Fetch user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    results.length > 0 ? res.json(results[0]) : res.status(404).json({ message: "User not found" });
  });
});

// ✅ Fetch worker by ID
app.get("/worker/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT first_name, last_name, email, role, date_of_birth, country, province, city, street, postal_code
    FROM Worker
    WHERE worker_id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Fetch worker error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    results.length > 0 ? res.json(results[0]) : res.status(404).json({ message: "Worker not found" });
  });
});

// ✅ Customer login
app.post("/login", (req, res) => {
  const { cardNumber, password } = req.body;

  if (!cardNumber || !password) {
    return res.status(400).json({ message: "Missing card number or password" });
  }

  const query = `
    SELECT customer_id, first_name, last_name
    FROM Customer
    WHERE primary_card_number = ? AND password = ?
  `;

  db.query(query, [cardNumber, password], (err, results) => {
    if (err) {
      console.error("❌ Login query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.json({ success: true, user: results[0] });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// ✅ Worker login
app.post("/login-worker", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  const query = `
    SELECT worker_id, first_name, last_name, role
    FROM Worker
    WHERE email = ? AND password = ?
  `;

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Worker login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.json({ success: true, user: results[0] });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));
