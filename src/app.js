const express = require('express');
const { config } = require ('dotenv');
const morgan = require('morgan');
const cors = require('cors')

//config dotenv file
config();

const app = express();

//middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
//remove this from production
app.use(morgan("dev"));
app.get('/', (req, res) => {
    res.status(200).send('Hello from localhost!');
});

//routes

//export app
module.exports = app;