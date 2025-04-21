
const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

let connection;

async function getConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(dbConfig);
      console.log("Database connection established");
    } catch (error) {
      console.error("Error connecting to database:", error);
      throw error;
    }
  }
  return connection;
}

// Helper function for API responses
const response = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
};

// Helper untuk cek & membuat tabel students jika belum ada
async function ensureStudentTable() {
  const conn = await getConnection();
  // Buat tabel kalau belum ada
  const sql = `
    CREATE TABLE IF NOT EXISTS students (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      photoUrl VARCHAR(255) NOT NULL,
      status ENUM('PRESENT', 'EXCUSED', 'ABSENT') NOT NULL DEFAULT 'PRESENT'
    );
  `;
  await conn.execute(sql);
}

module.exports = {
  getConnection,
  response,
  ensureStudentTable,
};
