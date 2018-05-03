var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var port = 5000;

app.use(express.static('server/public'));

app.listen(port, function(){
    console.log('app is listening on port:', port);
})