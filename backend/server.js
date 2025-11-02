import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

// ✅ Configure CORS to allow your frontend URLs
app.use(cors({
  origin: ["http://localhost:3000", "https://your-firebase-app.web.app"],
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
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to AWS RDS MySQL");
});

app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

app.get("/users", (req, res) => {
  db.query("SELECT customer_id, first_name, last_name FROM Customer", (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).send({ error: err.message });
    }
    res.send(results);
  });
});

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
      console.error("Login query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.json({
        success: true,
        user: results[0],
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.listen(PORT,"0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));
