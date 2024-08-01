// src/task1/index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'job_portal',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// API endpoint to add a new user
app.post('/addUser', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  db.query(query, [username, password, role], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Error adding user');
    }
    res.status(200).send({ id: result.insertId, username, role });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});