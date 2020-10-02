const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const cors = require('cors');
const conn = require('./dbUtils/connection');


const app = express();
const port = process.env.port || 30000;

app.use(bodyParser.urlencoded({  extended:  true  }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, text/html, Accept");
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


app.options('/the/resource/you/request', cors())
app.options('*', cors())


app.get('/', function(req, res) {
    res.send('this is the homepage');
});

//STATIC FOLDER
app.use(express.static('views'));

//ROUTER
app.use("/list", require("./controllers/scrap_router"));


app.listen(port, () => console.log(`API running on ${port} !`))