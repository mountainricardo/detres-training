/* src/app.js */
// Application module
angular.module('myApp',['myChart'])
	// main application controller
	.controller('MainCtrl', ['$scope', '$interval'
			, function($scope, $interval){
				
				var time = new Date('2014-01-01 00:00:00 +0100');

				// Random data point generator
				var randPoint = function(){
					var rand = Math.random;
					return { time: new Date(time.toString()), visitors: Math.floor(rand() * 100) };
				}

				//  We store a list of logs
				$scope.logs = [ randPoint() ];

				$interval(function(){
					time.setSeconds(time.getSeconds() + 1);
					$scope.logs.push(randPoint());
					console.log($scope.logs);
				},3000);

			}]);