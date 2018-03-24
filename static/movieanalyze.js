// Plot the default route once the page loads
var default_url = "/top10_movie_by_revenue";
Plotly.d3.json(default_url, function(error, response) {
    console.log("Inside plotly d3 json function");
    if (error) return console.warn(error);
    var data = [response];
    var layout = { margin: { t: 30, b:100 } }
    Plotly.plot("bar", data, layout)
})

// Update the plot with new data
function updatePlotly(newdata) {
    var Bar = document.getElementById('bar');
    Plotly.restyle(Bar, 'x', [newdata.x])
    Plotly.restyle(Bar, 'y', [newdata.y])
}

// Get new data whenever the dropdown selection changes
function getData(route) {
    console.log(route);
    Plotly.d3.json(`/${route}`, function(error, data) {
        console.log("newdata", data);
        updatePlotly(data);
    });
}

/* For Loading Scatter Plot */

// Step 0: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 80, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append an SVG group
var chart = svg.append("g");

// Append a div to the body to create tooltips, assign it a class
d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

// Retrieve data from the CSV file and execute everything below
var movie_revenue_profit_url = "/movie_profit_rating";
d3.json(movie_revenue_profit_url, function(error, moviedata) {
//d3.csv("hairData.csv", function(err, hairData) {
  if (error) throw err;
  console.log(moviedata);

  moviedata.forEach(function(data) {
    data.revenue = parseFloat(data.revenue);
    data.rating = parseFloat(data.rating);
    data.profit = parseFloat(data.profit);
    /* data.hair_length = +data.hair_length;
    data.num_hits = +data.num_hits;
    data.num_albums = +data.num_albums; */
  });

  // Create scale functions
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  var xLinearScale = d3.scaleLinear().range([0, width]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // These variables store the minimum and maximum values in a column in data.csv
  var xMin;
  var xMax;
  var yMax;

  // This function identifies the minimum and maximum values in a column in moviedata.csv
  // and assign them to xMin and xMax variables, which will define the axis domain
  function findMinAndMax(dataColumnX) {
    xMin = d3.min(moviedata, function(data) {
      return +data[dataColumnX] * 0.8;
    });

    xMax = d3.max(moviedata, function(data) {
      return +data[dataColumnX] * 1.1;
    });

    yMax = d3.max(moviedata, function(data) {
      return parseFloat(data.rating) * 1.1;
    });
  }

  // The default x-axis is 'hair_length'
  // Another axis can be assigned to the variable during an onclick event.
  // This variable is key to the ability to change axis/data column
  var currentAxisLabelX = "profit";

  // Call findMinAndMax() with 'hair_length' as default
  findMinAndMax(currentAxisLabelX);

  // Set the domain of an axis to extend from the min to the max value of the data column
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([0, yMax]);

  // Initialize tooltip
  var toolTip = d3
    .tip()
    .attr("class", "tooltip")
    // Define position
    .offset([80, -60])
    // The html() method allows us to mix JavaScript with HTML in the callback function
    // "http://image.tmdb.org/t/p/w185/" - For image of movie
    .html(function(data) {
      var movieTitle = data.original_title;
      // var bandName = data.rockband;
      var revenue = parseInt(data.revenue);
      var profit = parseInt(data.profit);
      var movieHomepage = data.homepage;
      var movie_poster_path = data.poster_path;
      
      /*var numHits = +data.num_hits;
      var bandInfo = +data[currentAxisLabelX];
      var bandString; */
      // Tooltip text depends on which axis is active/has been clicked
      var revenueString = "Revenue: ";
      var profitString = "Profit: ";
      // TODO: Add poster path link: http://image.tmdb.org/t/p/w185/ 
      /*if (currentAxisLabelX === "hair_length") {
        bandString = "Hair length: ";
      }
      else {
        bandString = "Number of albums: ";
      } 
      <a href="https://www.w3schools.com">Visit W3Schools.com!</a>
      */
      return '<a href="' + movieHomepage+ '">' + movieTitle + '</a>' + '<hr>' +
        '<br>' +
        revenueString + revenue + '<br>' +
        profitString + profit  + '<br>' +
        '<hr><br>'; //TO DO: Add Image poster pth later +
        //numHits;
    });

  // Create tooltip
  chart.call(toolTip);

  /*
  chart
    .selectAll("circle")
    .data(moviedata)
    .enter()
    .append("circle")
    .attr("cx", function(data, index) {
      console.log(data);
      return xLinearScale(+data[currentAxisLabelX]);
    })
    .attr("cy", function(data, index) {
      return yLinearScale(parseFloat(data.rating));
    })
    .attr("r", function(data, index) {
      //TODO: Check and update this 
      //return ((parseFloat(data.revenue)/100000) * 0.02);
      //.style("fill", "orange");
      return 3;
    })
    .attr("fill", "#E75480") 
    //.style("fill","blue");
    //.attr("fill", "#E75480")
    // display tooltip on click
    .on("click", function(data) {
      toolTip.show(data);
    });
    */
    chart
    .selectAll("circle")
    .data(moviedata)
    .enter()
    .append("circle")
    .attr("cx", function(data, index) {
      console.log(data);
      return xLinearScale(+data[currentAxisLabelX]);
    })
    .attr("cy", function(data, index) {
      return yLinearScale(parseFloat(data.rating));
    })
    .attr("r", function(data, index) {
      //TODO: Check and update this 
      //return ((parseFloat(data.revenue)/100000) * 0.02);
      //.style("fill", "orange");
      return 3;
    })
    .attr("fill", "#E75480") 
    //.style("fill","blue");
    //.attr("fill", "#E75480")
    // display tooltip on click
    .on("click", function(data) {
      toolTip.show(data);
    });
    // // hide tooltip on mouseout
    // .on("mouseout", function(data, index) {
    //   toolTip.hide(data);
    // });

  // Append an SVG group for the x-axis, then display the x-axis
  chart
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    // The class name assigned here will be used for transition effects
    .attr("class", "x-axis")
    .call(bottomAxis);

  // Append a group for y-axis, then display it
  chart.append("g").call(leftAxis);

  // Append y-axis label
  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axis-text")
    .attr("data-axis-name", "rating")
    .text("Cruncher Rating");

  // Append x-axis labels
  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
    )
    // This axis label is active by default
    .attr("class", "axis-text active")
    .attr("data-axis-name", "profit")
    .text("Profit ($ million)");

  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 45) + ")"
    )
    // This axis label is inactive by default
    .attr("class", "axis-text inactive")
    .attr("data-axis-name", "revenue")
    .text("Revenue ($ million)");

  // Change an axis's status from inactive to active when clicked (if it was inactive)
  // Change the status of all active axes to inactive otherwise
  function labelChange(clickedAxis) {
    d3
      .selectAll(".axis-text")
      .filter(".active")
      // An alternative to .attr("class", <className>) method. Used to toggle classes.
      .classed("active", false)
      .classed("inactive", true);

    clickedAxis.classed("inactive", false).classed("active", true);
  }

  d3.selectAll(".axis-text").on("click", function() {
    // Assign a variable to current axis
    var clickedSelection = d3.select(this);
    // "true" or "false" based on whether the axis is currently selected
    var isClickedSelectionInactive = clickedSelection.classed("inactive");
    // console.log("this axis is inactive", isClickedSelectionInactive)
    // Grab the data-attribute of the axis and assign it to a variable
    // e.g. if data-axis-name is "poverty," var clickedAxis = "poverty"
    var clickedAxis = clickedSelection.attr("data-axis-name");
    console.log("current axis: ", clickedAxis);

    // The onclick events below take place only if the x-axis is inactive
    // Clicking on an already active axis will therefore do nothing
    if (isClickedSelectionInactive) {
      // Assign the clicked axis to the variable currentAxisLabelX
      currentAxisLabelX = clickedAxis;
      // Call findMinAndMax() to define the min and max domain values.
      findMinAndMax(currentAxisLabelX);
      // Set the domain for the x-axis
      xLinearScale.domain([xMin, xMax]);
      // Create a transition effect for the x-axis
      svg
        .select(".x-axis")
        .transition()
        // .ease(d3.easeElastic)
        .duration(1800)
        .call(bottomAxis);
      // Select all circles to create a transition effect, then relocate its horizontal location
      // based on the new axis that was selected/clicked
      d3.selectAll("circle").each(function() {
        d3
          .select(this)
          .transition()
          // .ease(d3.easeBounce)
          .attr("cx", function(data) {
            return xLinearScale(+data[currentAxisLabelX]);
          })
          .duration(1800);
      });

      // Change the status of the axes. See above for more info on this function.
      labelChange(clickedSelection);
    }
  });
});
