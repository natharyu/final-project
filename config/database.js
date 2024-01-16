import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

try {
  await database.getConnection().then((connection) => {
    console.log("Connexion to database success mysql");
    connection.release();
  });
} catch (error) {
  console.error("Connexion to database failed:", error);
}

export default database;
