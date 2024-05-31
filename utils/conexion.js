import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port: 3306,
  database: process.env.MYSQL_DATABASE,
});
