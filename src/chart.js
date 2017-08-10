/* src/chart.js */
// Chart module

angular.module('myChart', [])

// D3 factory
.factory('d3', function(){

	/* We  could declare locals or other D3.js
	specific configurations here. */

	return d3;
})

// Scatter chart directive
.directive('myScatterChart', ['d3',
	function(d3){

		// 
		var draw = function(svg, width, height, data){
			svg
				.attr('width', width)
				.attr('height', height);

			// Define a margin
			var margin = 30;

			// Define x-scale
			var xScale = d3.time.scale()
				.domain(
					[
					d3.min(data, function(d){return d.x;}),
					d3.max(data, function(d){return  d.x;})
					]
					// alternative method to do the same
					// d3.extent(data, function(d) { return d.x; })
				)
				.range([margin, width - margin])
				// .range([0,24])
				.nice();
				// xScale.interpolate(d3.interpolate);

			// Define x-axis
			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('top')
				.axisLabel('Hours')
				.ticks(d3.time.hour)
				.tickFormat(d3.time.format('%H'));

			// Define y-scale
			var yScale = d3.time.scale()
			// var yScale = d3.scale.linear()
				.domain([0, d3.max(data, function(d){ return d.y;})])
				.range([margin, height - margin]);

			// Define y-axis
			var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left')
				.tickFormat(d3.format('d'));

			// Draw x-axis
			svg.select('.x-axis')
				.attr('transform', 'translate(0, ' + margin + ')')
				.call(xAxis);

			// Draw y-axis
			svg.select('.y-axis')
				.attr('transform', 'translate(' + margin + ')' )
				.call(yAxis);

			// Add the data points
			svg.select('.data')
				.selectAll('circle').data(data)
				.enter()
				.append('circle');


			// Update all data points
			svg.select('.data')
				.selectAll('circle').data(data)
				.attr('r', 2.5)
				.attr('cx', function(d) {return xScale(d.x);})
				.attr('cy', function(d) {return yScale(d.y)});
// console.log('d');
// console.log(d);


		}

		return {
			restrict: 'E',
			scope: {
				data: '=' 
			},
			compile: function(element, attrs, transclude) {

				// create a SVG element
				var svg = d3.select(element[0]).append('svg');

				svg.append('g').attr('class', 'data');
				svg.append('g').attr('class', 'x-axis axis');
				svg.append('g').attr('class', 'y-axis axis');

				// Define the dimensions for the chart
				var width = 600, height = 300;


				// Return the link function
				return function(scope,element,attrs) {

					// Watch the data attribute of the scope
					scope.$watch('data', function(newVal, oldVal, scope){
						// Map the data to internal format
						var data = scope.data.map(function(d){
							return {
								x: d.time,
								y: d.visitors
							}
						});

						// Update the chart
						draw(svg, width, height, data);
					}, true)
				};
			}
		};
	}]);