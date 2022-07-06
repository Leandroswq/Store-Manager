const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT || 3306,
  multipleStatements: true,
});

async function repopulateDB() {
  const query = fs.readFileSync('./backupDB.sql', 'utf8');
  console.log(typeof query);
  await connection.query(query);
  console.log('Backup restaurado');
  connection.end();
}

repopulateDB();