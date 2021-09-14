const mongoose = require("mongoose");
const cors=require('cors');
const express = require("express");
const app = express();
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const dotenv = require("dotenv");

dotenv.config({path:'./confiq.env'});

const port = process.env.Port;
app.use(require("./router/auth"));

require('./db/connect');

app.listen(port, () => {
  console.log("hello world i am server");
});
