const mysql = require("mysql");
require("dotenv").config();

var cnx;

// Sets up db to connect locally or on JAWSDB if deployed
if (process.env.JAWSDB_URL) {
  cnx = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  cnx = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "diary_db"
  });
}


// Export the connection so it's available in other parts of the app
module.exports = cnx;