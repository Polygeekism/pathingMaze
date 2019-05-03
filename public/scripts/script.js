var app = angular.module('myApp', []);

app.controller('mazeController', [
  '$http',
  function($http) {
    var self = this;

    self.sendMaze = function() {
      $http({
        method: 'POST',
        url: '/mazeinput/',
        data: { maze: self.mazeInput }
      }).then(function(response) {
        console.log(response.data);
        draw(response.data.maze);
      });
    };
    function draw(maze) {
      var canvas = document.getElementById('canvas');

      var ctx = canvas.getContext('2d');

      var board = maze;

      var width = 200;
      var blockSize = width / board.length;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      //Loop through the board array drawing the walls and the goal
      for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
          //Draw a wall
          if (board[y][x] === '#') {
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
          }
          //Draw the goal
          else if (board[y][x] === 'B') {
            drawGoalMarkers('red');
          } else if (board[y][x] === 'A') {
            drawGoalMarkers('green');
          }
        }
      }
      ctx.fillStyle = 'orange';
      for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
          if (board[y][x] === '@') {
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
          }
        }
      }
      function drawGoalMarkers(color) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.moveTo(x * blockSize, y * blockSize);
        ctx.lineTo((x + 1) * blockSize, (y + 1) * blockSize);
        ctx.moveTo(x * blockSize, (y + 1) * blockSize);
        ctx.lineTo((x + 1) * blockSize, y * blockSize);
        ctx.stroke();
      }
    }
  }
]);
