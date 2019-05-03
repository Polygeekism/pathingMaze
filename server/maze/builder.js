var findShortestPath = require('./shortest-path-finder');

function buildMaze(inputArray) {
  var i = 0;
  var maze = inputArray.split(/\s+/);
  var nRows = maze.length;
  var mazeStart = '';

  for (var i = 0; i < nRows; i++) {
    maze[i] = maze[i].split('');
  }
  for (var r = 0; r < maze.length; r++) {
    for (var p = 0; p < maze[r].length; p++) {
      if (maze[r][p] == 'A') {
        mazeStart = [r, p];
        break;
      }
    }
  }
  var nColumns = maze[0].length;
  var path = findShortestPath(mazeStart, maze);

  for (var t = 1; t < path.length; t++) {
    maze[path[t][0]][path[t][1]] = '@';
  }
  //remove path and findShortestPath
  var result = {
    path: path,
    gridSize: [nRows, nColumns],
    mazeStart: mazeStart,
    maze: maze
  };
  return result;
}

module.exports = buildMaze;
