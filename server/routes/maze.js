var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    console.log('reached the route from front end.', req.body.maze);
    buildMaze(req.body.maze);
    res.sendStatus(200);
})

function buildMaze(inputArray){
    var i = 0;
    var maze = inputArray.split(/\s+/);
    var nRows = maze.length;
    var mazeStart = "";
    var mazeEnd = "";

    
    for(var i =0; i<nRows; i++){
        //console.log('index',i, 'array',arr[i]);
        maze[i] = maze[i].split("");       
    }
    for(var r=0; r<maze.length; r++){
        for(var p =0; p<maze[r].length; p++){
            if(maze[r][p] == "A"){
                //console.log("yes A");
                mazeStart = [r,p];
                break;
            }            
        }        
    }

    //console.log('input maze', maze);

    // OK. We have the functions we need--let's run them to get our shortest path!
  
  // Create a 4x4 grid
  // Represent the grid as a 2-dimensional array
  var gridSize = 4;
  var grid = [];
  for (var i=0; i<gridSize; i++) {
    grid[i] = [];
    for (var j=0; j<gridSize; j++) {
      grid[i][j] = '.';
    }
  }
  
  // Think of the first index as "distance from the top row"
  // Think of the second index as "distance from the left-most column"
  
  // This is how we would represent the grid with obstacles above
  grid[0][0] = "A";
  grid[2][2] = "B";
  
  grid[1][1] = "#";
  grid[1][2] = "#";
  grid[1][3] = "#";
  grid[2][1] = "#";
  //console.log('grid', grid);
  console.log('base algorithm', findShortestPath([0,0], grid));  
  console.log('custom maze', findShortestPath(mazeStart, maze)); 

    
}


// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
var findShortestPath = function(startCoordinates, grid) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    console.log('distance from top and left', distanceFromTop, distanceFromLeft);
  
    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: 'Start'
    };
  
    // Initialize the queue with the start location already inside
    var queue = [location];
  
    // Loop through the grid searching for the B
    while (queue.length > 0) {
      // Take the first location off the queue
      var currentLocation = queue.shift();
  
      // Explore North
      var newLocation = exploreInDirection(currentLocation, 'North', grid);
      if (newLocation.status === 'B') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore East
      var newLocation = exploreInDirection(currentLocation, 'East', grid);
      if (newLocation.status === 'B') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore South
      var newLocation = exploreInDirection(currentLocation, 'South', grid);
      if (newLocation.status === 'B') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore West
      var newLocation = exploreInDirection(currentLocation, 'West', grid);
      if (newLocation.status === 'B') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
    }
  
    // No valid path found
    return false;
  
  };
  
  // This function will check a location's status
  // (a location is "valid" if it is on the grid, is not an "obstacle",
  // and has not yet been visited by our algorithm)
  // Returns "Valid", "Invalid", "Blocked", or "B"
  var locationStatus = function(location, grid) {
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;
  
    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {
  
      // location is not on the grid--return false
      return 'Invalid';
    } else if (grid[dft][dfl] === 'B') {
      return 'B';
    } else if (grid[dft][dfl] !== '.') {
      // location is either an obstacle or has been visited
      return 'Blocked';
    } else {
      return 'Valid';
    }
  };
  
  
  // Explores the grid from the given location in the given
  // direction
  var exploreInDirection = function(currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);
  
    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;
  
    if (direction === 'North') {
      dft -= 1;
    } else if (direction === 'East') {
      dfl += 1;
    } else if (direction === 'South') {
      dft += 1;
    } else if (direction === 'West') {
      dfl -= 1;
    }
  
    var newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, grid);
  
    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
      grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
    }
  
    return newLocation;
  };
  
  
    
   


module.exports = router;