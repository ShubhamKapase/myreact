

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection using mysql2
const db = mysql.createConnection({
    host: 'localhost',   // MySQL host, usually localhost
    user: 'root',        // MySQL username
    password: 'root',    // MySQL password (change as per your setup)
    database: 'user_registration', // Name of the database
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// API Endpoint to Register User
app.post('/register', (req, res) => {
    const { firstName, lastName, dateOfBirth, gender } = req.body;

    const query = 'INSERT INTO users (first_name, last_name, date_of_birth, gender) VALUES (?, ?, ?, ?)';
    db.query(query, [firstName, lastName, dateOfBirth, gender], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});