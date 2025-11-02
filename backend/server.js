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

// ✅ Add a root endpoint for Render health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// ✅ Your users route
app.get("/users", (req, res) => {
  db.query("SELECT customer_id, first_name, last_name FROM Customer", (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).send({ error: err.message });
    }
    res.send(results);
  });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
