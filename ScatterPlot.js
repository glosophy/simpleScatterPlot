// Set up margin, width, and height
var margin = {top: 20, right: 350, bottom: 50, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// Add canvas to body
var svg = d3.select("div").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Set up x values for MPG
var xValue = function(d) { return d.Horsepower;},
    xScale = d3.scale.linear().range([0, width]),
    xMap = function(d) { return xScale(xValue(d));}, // Position on x axis of each element in data
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");


// Set up y values for Horsepower
var yValue = function(d) { return d.MPG;},
    yScale = d3.scale.linear().range([height, 0]),
    yMap = function(d) { return yScale(yValue(d));}, // Position on y axis of each element in data
    yAxis = d3.svg.axis().scale(yScale).orient("left");


// Set fill color to be cylinders and make colors customizable
var cValue = function(d) { return d.Cylinders;},
    colors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#911eb4'];
    color = d3.scale.ordinal().range(colors);


// Load the car data
d3.csv("https://gist.githubusercontent.com/glosophy/034592d78d81e29e0dcbc4f620141654/raw/a8eacd2c2ac258734dbcfbbfc96454dc958e8d4b/cars.csv", function(error, data) {
  data.forEach(function(d) {
    d.Cylinders = +d.Cylinders;
    d.Horsepower = +d.Horsepower;
    d.MPG = +d.MPG
  });


  // The domain of x and y
  xScale.domain([0, d3.max(data, xValue)+1]);
  yScale.domain([0, d3.max(data, yValue)+1]);


  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
          .attr("class", "x-label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Horsepower");


  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
          .attr("class", "y-label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("MPG");


  // Draw the scatterplot
  svg.selectAll(".dot") // Selects the svg element (dot)
      .data(data) // If it finds any rects, it returns them as a selection (an array of elements)
      .enter().append("circle") // Adds a circle for each item in our selection
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));})


  // Legend for origin
  var legend = svg.selectAll(".legend")
      .data(color.domain()).enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


  // Draw colored squares for the legend
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);


  // Insert text for the legend
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d + " cylinders" ;})

});
