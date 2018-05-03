var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    console.log('reached the route from front end.', req.body);
    res.sendStatus(200);
})

module.exports = router;