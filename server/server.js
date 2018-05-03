var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var port = process.env.PORT || 5000;

app.listen(port, function(){
    console.log('app is listening on port:', port);
})