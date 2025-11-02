import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
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

app.get("/users", (req, res) => {
    db.query("SELECT customer_id, first_name, last_name FROM Customer", (err, results) => {
        if (err) {
            console.error("Query error:", err); // <--- log the error
            return res.status(500).send({ error: err.message });
        }
        res.send(results);
    });
});

app.listen(PORT, () => console.log("Server running on port 3001"));
