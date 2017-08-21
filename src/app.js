/* src/app.js */
// Application module
angular.module('myApp',['myChart'])
	// main application controller
	.controller('MainCtrl', ['$scope', '$interval'
			, function($scope, $interval){
				
				// var time = new Date('2014-01-01 00:00:00 +0100');
				var time = new Date();
				function getRandomInt(min, max) {
				  min = Math.ceil(min);
				  max = Math.floor(max);
				  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
				}

				// Random data point generator
				var randPoint = function(){
					var rand = Math.random;
					var randH = getRandomInt(0,23);
					var randM = getRandomInt(0,59);
					var t =  new Date('2017-08-01 ' + randH + ':' + randM + ':00 +0100');
					// console.log(t);
					return { time: t.getTime(), visitors: Math.floor(rand() * 100) };
				}

				//  We store a list of logs
				$scope.logs = [ randPoint() ];
				for(var i = 0; i < 50; i++){
					var p = randPoint();
					console.log(p);
					$scope.logs.push(p);
				}

				// $interval(function(){
				// 	time.setSeconds(time.getSeconds() + 1);
				// 	$scope.logs.push(randPoint());
				// 	// console.log($scope.logs);
				// },3000);

			}]);