const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require("body-parser");

const connectDB = require('./config/db');
const studentRoute = require('./routes/students')

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();

app.use("/uploads", express.static("uploads"));

app.use('/api/students', studentRoute);

app.listen(5000, () => {
    console.log("server is up and running");
})