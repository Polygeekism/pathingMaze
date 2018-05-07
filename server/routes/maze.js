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
    var twoDArray = [];
    var nRows = arr.length;
    var mazeStart = "";
    var mazeEnd = "";

    
    for(var i =0; i<nRows; i++){
        //console.log('index',i, 'array',arr[i]);
        arr[i] = arr[i].split("");       
    }
    for(var r=0; r<arr.length; r++){
        for(var p =0; p<arr[r].length; p++){
            if(arr[r][p] == "A"){
                //console.log("yes A");
                mazeStart = [[r],[p]];
            }
            if(arr[r][p] == "B"){
                //console.log("yes B");
                mazeEnd = [[r],[p]];
            }
            
        }        
    }

    console.log('input maze', arr);

    
}
    
   


module.exports = router;