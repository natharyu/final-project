import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const database = mysql.createPool({
  host: "109.234.160.81",
  port: 3306,
  user: "ocqf5950_Natharyu",
  password: "Tit@ncheat287",
  database: "ocqf5950_final_project2",
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
