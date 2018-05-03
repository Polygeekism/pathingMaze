console.log("sourced the javascript");


var app = angular.module('myApp', []);

app.controller('mazeController', ['$http', function($http){
    console.log("controller has been loaded");
}]);