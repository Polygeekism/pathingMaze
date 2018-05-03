var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var maze = require('./routes/maze');

var port = 5000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/mazeinput', maze)

app.listen(port, function(){
    console.log('app is listening on port:', port);
})