var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    console.log('reached the route from front end.', req.body.maze);
    buildMaze(req.body.maze);
    res.sendStatus(200);
})

function buildMaze(inputArray){
    var i = 0;
    var arr = inputArray.split(/\s+/);
    console.log('buildmaze function', arr);
    

}

module.exports = router;