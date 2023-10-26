const mysql = require("mysql");

const db = mysql.createConnection({
  host: "my-ass3-db.czitenpj2hew.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "a3db",
});

db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed", err);
    return;
  }
  console.log("Connected to the database.");
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS products (
  name VARCHAR(100),
  price VARCHAR(100),
  availability boolean
)`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating table:", err);
    return;
  }
  console.log("Table created or already exists");
});

module.exports = db;
