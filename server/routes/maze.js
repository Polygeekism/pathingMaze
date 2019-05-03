var express = require('express');
var router = express.Router();
var buildMaze = require('../maze/builder');

router.post('/', function(req, res) {
  res.send(buildMaze(req.body.maze));
});
module.exports = router;
