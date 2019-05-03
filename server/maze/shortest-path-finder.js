var findShortestPath = function(startCoordinates, grid) {
  var distanceFromTop = startCoordinates[0];
  var distanceFromLeft = startCoordinates[1];

  /* Each "location" will store its coordinates
    and the shortest path required to arrive there */
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
    var directionArray = ['North', 'East', 'South', 'West'];

    // explore each direction for valid moves
    for (var i = 0; i < directionArray.length; i++) {
      var newLocation = exploreInDirection(
        currentLocation,
        directionArray[i],
        grid
      );
      if (newLocation.status === 'B') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
    }
  }

  // No valid path found
  return false;
};

var exploreInDirection = function(currentLocation, direction, grid) {
  var newPath = currentLocation.path.slice();
  newPath.push([
    currentLocation.distanceFromTop,
    currentLocation.distanceFromLeft
  ]);

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

var locationStatus = function(location, grid) {
  var nColumnCheck = grid[0].length - 1;
  var nRowCheck = grid.length - 1;

  if (
    location.distanceFromLeft < 0 ||
    location.distanceFromLeft > nColumnCheck ||
    location.distanceFromTop < 0 ||
    location.distanceFromTop > nRowCheck
  ) {
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

module.exports = findShortestPath;
