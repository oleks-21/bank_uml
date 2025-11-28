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
    SELECT first_name, last_name, email, date_of_birth, country, province, city, street, postal_code, frozen
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

//TC-01: Validate Successful Login and TC-02: Reject Invalid Login (Wrong Password)
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

// TC-17: Logout properly invalidates the user's session
app.post("/logout", (req, res) => {
  if (!req.session) {
    return res.json({ success: true, message: "Already logged out" });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Logout error:", err);
      return res.status(500).json({ message: "Failed to log out" });
    }

    // Clear session cookie
    res.clearCookie("connect.sid");
    return res.json({ success: true, message: "Logged out successfully" });
  });
});


//TC-04: Reject Login When Email Does Not Exist (worker)
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


//function to check the age
function isAtLeast18(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18;
}

//TC-07: Registration Fails When the User is Underage
//TC-08: Registration Fails When Another Account Uses the Same Email
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

  if (!first_name || !last_name || !email || !password || !date_of_birth) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  //age checking
  if(!isAtLeast18(date_of_birth)){
    return res.status(403).json({
      message: "You must be at least 18 years old to create an account"
    });
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

        //this is where the duplicate email error comes from now
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ message: "An account with this email already exists" });
        }

        return res.status(500).json({ message: "Failed to register user" });
      }

      res.json({
        success: true,
        message: "User registered successfully",
        customer_id: result.insertId,
        card_number: primary_card_number,
      });

      // Create initial account for the user
      const accountQuery = `
        INSERT INTO Account (card_number, balance, account_type, user_id, date_created)
        VALUES (?, ?, ?, ?, NOW())
      `;
      db.query(
        accountQuery,
        [primary_card_number, 1000, 'chequing', result.insertId],
        (accErr) => {
          if (accErr) {
            console.error("❌ Account creation error:", accErr);
            // Optionally handle account creation failure
          }
        }
      );
    }
  );
});

// Fetch accounts (optionally filtered by customerId)
app.get('/accounts/:customerId', (req, res) => {
  const { customerId } = req.params;
  let query = `SELECT * FROM Account where user_id = ?`;

  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('❌ Fetch accounts error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.json(results);
  });
});

// Fetch all customer profiles
app.get('/customers', (req, res) => {
  const query = `SELECT customer_id, first_name, last_name, email, date_of_birth, country, province, city, street, postal_code, frozen FROM Customer`;
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
    'country', 'province', 'city', 'street', 'postal_code', 'frozen'
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

// Update worker profile fields
app.patch('/worker/:id', (req, res) => {
  const { id } = req.params;
  const allowedFields = [
    'first_name', 'last_name', 'email', 'role', 'date_of_birth',
    'country', 'province', 'city', 'street', 'postal_code'
  ];
  const updates = Object.entries(req.body)
    .filter(([key]) => allowedFields.includes(key));

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No valid fields to update.' });
  }

  const setClause = updates.map(([key]) => `${key} = ?`).join(', ');
  const values = updates.map(([, value]) => value);

  const query = `UPDATE Worker SET ${setClause} WHERE worker_id = ?`;
  db.query(query, [...values, id], (err, result) => {
    if (err) {
      console.error('❌ Update worker error:', err);
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

// Transfer funds between accounts
app.post('/transfer', async (req, res) => {
  const { from, to, amount, customer_id } = req.body;
  if (!from || !to || !amount || isNaN(amount) || !customer_id) {
    return res.status(400).json({ message: 'Missing or invalid transfer data.' });
  }

  // Helper to run queries as promises
  const queryAsync = (query, params) => new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

  try {
    // 0. Check that 'from' card_number belongs to the customer_id
    const [accountCheck] = await queryAsync('SELECT * FROM Account WHERE card_number = ? AND user_id = ?', [from, customer_id]);
    if (!accountCheck) {
      return res.status(403).json({ message: 'Sender card does not belong to the current user.' });
    }

    // 1. Get sender and recipient accounts
    const [sender] = await queryAsync('SELECT * FROM Account WHERE card_number = ?', [from]);
    const [recipient] = await queryAsync('SELECT * FROM Account WHERE card_number = ?', [to]);
    if (!sender || !recipient) {
      return res.status(404).json({ message: 'Sender or recipient account not found.' });
    }

    // 2. Check frozen status for both customers
    const [senderCustomer] = await queryAsync('SELECT frozen FROM Customer WHERE customer_id = ?', [sender.user_id]);
    const [recipientCustomer] = await queryAsync('SELECT frozen FROM Customer WHERE customer_id = ?', [recipient.user_id]);
    if (!senderCustomer || !recipientCustomer) {
      return res.status(404).json({ message: 'Sender or recipient customer not found.' });
    }
    if (senderCustomer.frozen || recipientCustomer.frozen) {
      return res.status(403).json({ message: 'Sender or recipient account is frozen.' });
    }

    // 3. Check for pending transfer for either card
    const pendingTransfers = await queryAsync('SELECT * FROM Transfer WHERE (card_number_from = ? OR card_number_to = ?) AND pending = 1', [from, to]);
    if (pendingTransfers.length > 0) {
      return res.status(409).json({ message: 'There is already a pending transfer for one of the accounts.' });
    }

    // 4. Check sufficient funds
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds.' });
    }

    // 5. Insert transfer
    let pending = amount >= 1000 ? 1 : 0;
    await queryAsync('INSERT INTO Transfer (card_number_from, card_number_to, amount, pending) VALUES (?, ?, ?, ?)', [from, to, amount, pending]);

    // 6. If not pending, update balances
    if (pending === 0) {
      await queryAsync('UPDATE Account SET balance = balance - ? WHERE card_number = ?', [amount, from]);
      await queryAsync('UPDATE Account SET balance = balance + ? WHERE card_number = ?', [amount, to]);
    }

    res.json({ success: true, pending: !!pending });
  } catch (err) {
    console.error('❌ Transfer error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/transaction', async (req, res) => {
  const { card_number, amount, transaction_type, customer_id } = req.body;
  if (!card_number || !amount || isNaN(amount) || !transaction_type || !customer_id) {
    return res.status(400).json({ message: 'Missing or invalid transaction data.' });
  }

  const queryAsync = (query, params) => new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

  try {
    // 1. Check card_number belongs to user
    const [account] = await queryAsync('SELECT * FROM Account WHERE card_number = ? AND user_id = ?', [card_number, customer_id]);
    if (!account) {
      return res.status(403).json({ message: 'Card does not belong to the current user.' });
    }
    const [customer] = await queryAsync('SELECT frozen FROM Customer WHERE customer_id = ?', [customer_id]);
    if (customer.frozen = 1) {
      return res.status(401).json({ message: 'This account is frozen.' });
    }
    // 2. For withdrawal, check sufficient funds
    // TC-03: Reject Withdrawal When Insufficient Funds // TC-06: Reject Withdrawal When Insufficient Funds // TC-20: Reject Withdrawal When Insufficient Funds with Pending Transactions
    if (transaction_type === 'withdrawal' && account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds.' });
    }

    // 3. Check for pending status in Transfer or Transaction tables
    const pendingTransfer = await queryAsync('SELECT * FROM Transfer WHERE (card_number_from = ? OR card_number_to = ?) AND pending = 1', [card_number, card_number]);
    const pendingTransaction = await queryAsync('SELECT * FROM Transaction WHERE card_number = ? AND pending = 1', [card_number]);
    if (pendingTransfer.length > 0 || pendingTransaction.length > 0) {
      return res.status(409).json({ message: 'There is already a pending transfer or transaction for this account.' });
    }

    // 4. Insert transaction (pending=1)
    // TC-19: Withdrawal and Deposit Transactions are Marked as Pending
    await queryAsync('INSERT INTO Transaction (amount, card_number, transaction_type, transaction_date, pending) VALUES (?, ?, ?, NOW(), 1)', [amount, card_number, transaction_type]);

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Transaction error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch('/transaction/:id', async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'accept' or 'reject'
  if (!action || (action !== 'accept' && action !== 'reject')) {
    return res.status(400).json({ message: 'Invalid action.' });
  }

  const queryAsync = (query, params) => new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

  try {
    // Get transaction
    const [tx] = await queryAsync('SELECT * FROM Transaction WHERE transaction_id = ?', [id]);
    if (!tx) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }
    // Only process if pending
    if (tx.pending !== 1) {
      return res.status(400).json({ message: 'Transaction is not pending.' });
    }

    // Always set pending=0
    await queryAsync('UPDATE Transaction SET pending = 0 WHERE transaction_id = ?', [id]);

    if (action === 'accept') {
      // Update balance
      // TC-05: Accept Transaction and Update Balance // TC-18: Multiple Sequential Deposits Update Balance Correctly
      if (tx.transaction_type === 'deposit') {
        await queryAsync('UPDATE Account SET balance = balance + ? WHERE card_number = ?', [tx.amount, tx.card_number]);
      } else if (tx.transaction_type === 'withdrawal') {
        await queryAsync('UPDATE Account SET balance = balance - ? WHERE card_number = ?', [tx.amount, tx.card_number]);
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Transaction accept/reject error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.patch('/transfer-action/:id', async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  if (!["accept", "reject"].includes(action)) {
    return res.status(400).json({ message: "Invalid action." });
  }
  const queryAsync = (query, params) => new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

  try {
    // 1. Fetch transfer
    const [tx] = await queryAsync(
      "SELECT * FROM Transfer WHERE transfer_id = ?",
      [id]
    );
    if (!tx) return res.status(404).json({ message: "Transfer not found" });

    // 2. Must be pending
    if (tx.pending !== 1) {
      return res.status(400).json({ message: "Transfer is not pending." });
    }

    // 3. Always set pending = 0
    await queryAsync(
      "UPDATE Transfer SET pending = 0 WHERE transfer_id = ?",
      [id]
    );

    // 4. Accept → adjust balances
    if (action === "accept") {
      await queryAsync(
        "UPDATE Account SET balance = balance - ? WHERE card_number = ?",
        [tx.amount, tx.card_number_from]
      );

      await queryAsync(
        "UPDATE Account SET balance = balance + ? WHERE card_number = ?",
        [tx.amount, tx.card_number_to]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Transfer error:", err);
    res.status(500).json({ message: "Internal server error: " });
  }
});

app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));
