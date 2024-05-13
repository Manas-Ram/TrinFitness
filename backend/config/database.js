const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Specify your database file
const dbPath = path.resolve(__dirname, 'trinfitness.db');

// Open the SQLite database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
