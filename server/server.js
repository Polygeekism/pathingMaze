var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var maze = require('./routes/maze');

var port = 5000;

app.use(express.static('public'));

app.use('/mazeinput', maze)

app.listen(port, function(){
    console.log('app is listening on port:', port);
})