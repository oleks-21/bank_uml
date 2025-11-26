import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://bankuml.web.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

app.post("/register", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    date_of_birth,
    country,
    province,
    city,
    street,
    postal_code,
    document_1,
    document_2,
    password,
  } = req.body;

  const primary_card_number = Math.floor(1e15 + Math.random() * 9e15);

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const query = `
    INSERT INTO Customer 
    (first_name, last_name, email, date_of_birth, country, province, city, street, postal_code, document_1, document_2, password, primary_card_number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      first_name,
      last_name,
      email,
      date_of_birth,
      country,
      province,
      city,
      street,
      postal_code,
      document_1 || null,
      document_2 || null,
      password,
      primary_card_number,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Registration error:", err);
        return res.status(500).json({ message: "Failed to register user" });
      }

      res.json({
        success: true,
        message: "User registered successfully",
        customer_id: result.insertId,
        card_number: primary_card_number,
      });
    }
  );
});

// Fetch accounts (optionally filtered by customerId)
app.get('/accounts', (req, res) => {
  const { customerId } = req.query;
  let query = `SELECT * FROM Account`;
  const params = [];

  if (customerId) {
    query += ` WHERE customer_id = ?`;
    params.push(customerId);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('❌ Fetch accounts error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.json(results);
  });
});

// Fetch all customer profiles
app.get('/customers', (req, res) => {
  const query = `SELECT customer_id, first_name, last_name, email, date_of_birth, country, province, city, street, postal_code FROM Customer`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Fetch customers error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

// Fetch all staff profiles
app.get('/workers', (req, res) => {
  const query = `SELECT worker_id, first_name, last_name, email, role, date_of_birth, country, province, city, street, postal_code FROM Worker`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Fetch workers error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

// Update customer profile fields
app.patch('/user/:id', (req, res) => {
  const { id } = req.params;
  const allowedFields = [
    'first_name', 'last_name', 'email', 'date_of_birth',
    'country', 'province', 'city', 'street', 'postal_code'
  ];
  const updates = Object.entries(req.body)
    .filter(([key]) => allowedFields.includes(key));

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No valid fields to update.' });
  }

  const setClause = updates.map(([key]) => `${key} = ?`).join(', ');
  const values = updates.map(([, value]) => value);

  const query = `UPDATE Customer SET ${setClause} WHERE customer_id = ?`;
  db.query(query, [...values, id], (err, result) => {
    if (err) {
      console.error('❌ Update customer error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ success: true, affectedRows: result.affectedRows });
  });
});

// Fetch transactions for a given customer
app.get("/transactions/:customerId", (req, res) => {
  const { customerId } = req.params;

  const query = `
    SELECT 
      t.transaction_id,
      t.amount,
      t.card_number,
      t.transaction_type,
      t.transaction_date,
      t.pending
    FROM Transaction t
    JOIN Account a ON t.card_number = a.card_number
    WHERE a.user_id = ?
    ORDER BY t.transaction_date DESC;
  `;

  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error("❌ Fetch transactions error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.json(results);
  });
});

// Fetch all pending transactions
app.get('/pending-transactions', (req, res) => {
  const query = `SELECT * FROM Transaction WHERE pending = 1`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Fetch pending transactions error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

// Fetch all transfers for a customer (by card association)
app.get('/transfers/:customerId', (req, res) => {
  const { customerId } = req.params;
  const query = `
    SELECT t.*
    FROM Transfer t
    JOIN Account a_from ON t.card_number_from = a_from.card_number
    JOIN Account a_to ON t.card_number_to = a_to.card_number
    WHERE a_from.user_id = ? OR a_to.user_id = ?
  `;
  db.query(query, [customerId, customerId], (err, results) => {
    if (err) {
      console.error('❌ Fetch transfers error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

// Fetch all pending transfers
app.get('/pending-transfers', (req, res) => {
  const query = `SELECT * FROM Transfer WHERE pending = 1`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Fetch pending transfers error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));
