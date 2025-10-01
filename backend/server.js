const express = require("express");
const app = express();

const cors = require("cors");
const mysql = require("mysql");

const corsOptions = {
  origin: [
    "http://localhost:3000", // Replace with your frontend URL
    "http://localhost:8081", // Another allowed origin
  ],
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  headers: "Content-Type, Authorization",
  credentials: true,
};


mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudnode",
});


app.get("/", (req, res) => {
  const sql = "SELECT * FROM students";
  database.query(sql, (err, data) => {
    if (err) 
      return res.json(Error);
    res.json(data);
  });
});



app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
