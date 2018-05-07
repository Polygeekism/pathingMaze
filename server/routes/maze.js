var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    //console.log('reached the route from front end.', req.body.maze);
    //buildMaze(req.body.maze);
    res.send(buildMaze(req.body.maze));
})

function buildMaze(inputArray){
    var i = 0;
    var maze = inputArray.split(/\s+/);
    var nRows = maze.length;
    var mazeStart = "";

    
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
    var nColumns = maze[0].length;
    var path =findShortestPath(mazeStart, maze);

    for(var t = 1; t<path.length; t++){
        console.log(maze[path[t][0]][path[t][1]]);
        maze[path[t][0]][path[t][1]] = "@";
    }
    

    //console.log('input maze', nColumns, nRows, maze);


 
  //console.log('custom maze', findShortestPath(mazeStart, maze)); 
  var result = { 
    path: path,
    gridSize: [nRows, nColumns],
    mazeStart: mazeStart,
    maze: maze};

  return result;  
}


// Start location will be in the following format:
// 
var findShortestPath = function(startCoordinates, grid) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    //console.log('distance from top and left', distanceFromTop, distanceFromLeft);
  
    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: 'Start'
    };
  
    //console.log('location', location);
    // Initialize the queue with the start location already inside
    var queue = [location];
  
    // Loop through the grid searching for the B
    while (queue.length > 0) {
      // Take the first location off the queue
      var currentLocation = queue.shift();
      //console.log('currentlocation', currentLocation);
  
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

    //console.log('location in locationstatus', location);

    var nColumnCheck = grid[0].length -1;
    var nRowCheck = grid.length -1;
    //console.log('rows and columns,', nColumnCheck, nRowCheck);
    
    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft > nColumnCheck ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop > nRowCheck) {
            return 'Invalid';
        }

    var dft = location.distanceFromTop;

    var dfl = location.distanceFromLeft;

    if (grid[dft][dfl] === 'B') {
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
    newPath.push([currentLocation.distanceFromTop, currentLocation.distanceFromLeft]);
  
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