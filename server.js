'use strict';

const express = require('express');
const mysql = require('mysql2');
const create_table = "CREATE TABLE IF NOT EXISTS nbconnect (number INTEGER)";
const increment_count = "INSERT INTO nbconnect (number) VALUES (1)";
const get_count = "SELECT COUNT(*) AS nb FROM nbconnect";

const PORT = 8083;
const HOST = '0.0.0.0';


const con = mysql.createConnection({
  host: "mysqldb",
  user: "user",
  password: "Passw0rd",
  database: "db_test"
  });

const app = express();

app.get('/', (req, res) => {
  try{
      con.query(create_table,function (err){
    if (err) throw err;
    con.query(increment_count, function (err) {
                  if (err) throw err;
              });
    });
   con.query(get_count, function (err, count,) {
     if (err) throw err;
     res.send("Connected " + count[0].nb +" times !")
   });
  }
  catch (err) {
    console.log(err)
  }

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);