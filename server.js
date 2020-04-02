'use strict';
var express = require('express');
var app = express();

//Static Files
const CONFIG_FILE = require("./config.json"); 

global.ENV_DATA = (process.env.NODE_ENV)? CONFIG_FILE[process.env.NODE_ENV]: CONFIG_FILE["local"];

var bodyParser = require('body-parser');
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./sequelize/index");
db.sequelize.sync();

var server = app.listen(global.ENV_DATA.port, function () {
   
    var host = server.address().address
    var port = server.address().port

    console.log("Dharma Apis listening at http://%s:%s at %s", host, port, new Date())
});

// //------- ROUTING ----------sss
app.use('/apis/user',require('./routes/user.routes'));
app.use('/apis/task', require('./routes/tasks.routes'));