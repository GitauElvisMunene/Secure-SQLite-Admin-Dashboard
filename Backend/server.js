const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const authRoutes = require("./routes/route");
const fs = require('fs'); // For file checks
const path = require('path');


const app= express();

const PORT = 8000;

const DB_PATH = path.join(__dirname, 'mock.db'); // Full path to DB

//Middleware to parse JSOn

app.use(express.json());


app.get('/', (req, res) => res.send('API is working!'));

//use the auth routes

app.use('/', authRoutes)

// Initialize DB and table
function initializeDatabase() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) return reject(err);
  
        // Create 'Users' table if it doesn't exist
        db.run(`
          CREATE TABLE IF NOT EXISTS Users (
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            id INTEGER PRIMARY KEY AUTOINCREMENT
          )
        `, (err) => {
          db.close(); // Close the DB connection
          if (err) reject(err);
          else resolve();
        });
      });
    });
  }
  
  // Start the server only after DB is ready
  initializeDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Database and table are ready!');
      });
    })
    .catch((err) => {
      console.error('Failed to initialize database:', err);
      process.exit(1); // Crash the server if DB setup fails
    });
  

















