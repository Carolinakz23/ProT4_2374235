import mysql from 'mysql2/promise';

const properties = {
  host: "localhost",
  user: "root",
  password: "",
  database: "rest-api",
};

const pool = mysql.createPool(properties);

export { pool };
