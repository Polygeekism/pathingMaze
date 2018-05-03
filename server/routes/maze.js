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
    console.log('buildmaze function', arr,'start', mazeStart, 'end', mazeEnd)

    //findPath(mazeStart[0], mazeStart[1], mazeEnd[0], mazeEnd[1]);
    
}

var jp = jp || {};

function findPath(xC, yC, xT, yT){
    var current, // Current best open tile
        neighbors, // Dump of all nearby neighbor tiles
        neighborRecord, // Any pre-existing records of a neighbor
        stepCost, // Dump of a total step score for a neighbor
        i;

    // You must add the starting step
    this.reset()
        .addOpen(new jp.Step(xC, yC, xT, yT, this.step, false));

    while (this.open.length !== 0) {
        current = this.getBestOpen();

        // Check if goal has been discovered to build a path
        if (current.x === xT && current.y === yT) {
            return this.buildPath(current, []);
        }

        // Move current into closed set
        this.removeOpen(current)
            .addClosed(current);

        // Get neighbors from the map and check them
        neighbors = jp.map.getNeighbors(current.x, current.y);
        for (i = 0; i < neighbors.length; i++) {
            // Get current step and distance from current to neighbor
            stepCost = current.g + jp.map.getCost(current.x, current.y, neighbors[i].x, neighbors[i].y);

            // Check for the neighbor in the closed set
            // then see if its cost is >= the stepCost, if so skip current neighbor
            neighborRecord = this.inClosed(neighbors[i]);
            if (neighborRecord && stepCost >= neighborRecord.g)
                continue;

            // Verify neighbor doesn't exist or new score for it is better
            neighborRecord = this.inOpen(neighbors[i]);
            if (!neighborRecord || stepCost < neighborRecord.g) {
                if (!neighborRecord) {
                    this.addOpen(new jp.Step(neighbors[i].x, neighbors[i].y, xT, yT, stepCost, current));
                } else {
                    neighborRecord.parent = current;
                    neighborRecord.g = stepCost;
                    neighborRecord.f = stepCost + neighborRecord.h;
                }
            }
        }
    }

    return false;
}


module.exports = router;