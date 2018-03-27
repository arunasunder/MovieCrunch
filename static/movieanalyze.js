//Initilaize variables for the different elements


var $AllBtn = document.querySelector("#All");

var $Y2017Btn = document.querySelector("#Y2017");
var $Y2016Btn  = document.querySelector("#Y2016");
var $Y2015Btn  = document.querySelector("#Y2015");
var $Y2014Btn  = document.querySelector("#Y2014");
var $Y2013Btn  = document.querySelector("#Y2013");
var movie_revenue_profit_url = "/movie_profit_rating";

$AllBtn.addEventListener("click", handleAllButtonClick);
$Y2017Btn.addEventListener("click", handle_2017_ButtonClick);
$Y2016Btn.addEventListener("click", handle_2016_ButtonClick);
$Y2015Btn.addEventListener("click", handle_2015_ButtonClick);
$Y2014Btn.addEventListener("click", handle_2014_ButtonClick);
$Y2013Btn.addEventListener("click", handle_2013_ButtonClick);

// Plot the default route once the page loads for first plotly bar chart 
var default_url = "/top10_movie_by_revenue";
Plotly.d3.json(default_url, function(error, response) {
    console.log("Inside plotly d3 json function for loading first chart");
    if (error) return console.warn(error);
    var data = [response];
    var layout = { margin: { t: 30, b:100 } }
    Plotly.plot("bar", data, layout)
})

// Plot the default route once the page loads for bar2 chart
var default_url = "/total_revenue";
Plotly.d3.json(default_url, function(error, response) {
    console.log("Inside plotly d3 json function for loading bar2 chart");
    if (error) return console.warn(error);
    var data = [response];
    var layout = { margin: { t: 30, b:100 } }
    Plotly.plot("bar2", data, layout)
})

var color_mapper = [ 
                      { 'year': 'All', 'color': '#0d42ba'}, //blue
                      { 'year': '2017', 'color': '#0dba2f' },  //green
                      { 'year': '2016', 'color': '#8090c2' }, //purple
                      { 'year': '2015', 'color': '#ba2f0d' }, //red
                      { 'year': '2014', 'color': '#f08026' }, //orange
                      { 'year': '2013', 'color': '#ba860d' } //brown
                    ];

var selected = "All";


function handleAllButtonClick() {
  movie_revenue_profit_url = "/movie_profit_rating";
  selected = color_mapper[1].year;
  console.log("Selected year: " + selected);
  makeResponsive();
}

function handle_2017_ButtonClick() {
  movie_revenue_profit_url = "/movie_profit_rating_2017";
  selected = color_mapper[1].year; //2017
  console.log("Selected year: " + selected);
  makeResponsive();
}

function handle_2016_ButtonClick() {
  movie_revenue_profit_url = "/movie_profit_rating_2016";
  selected = color_mapper[2].year; //2016
  console.log("Selected year: " + selected);
  makeResponsive();
}

function handle_2015_ButtonClick() {
  movie_revenue_profit_url = "/movie_profit_rating_2015";
  selected = color_mapper[3].year; //2015
  console.log("Selected year: " + selected);
  makeResponsive();
}

function handle_2014_ButtonClick() {
  movie_revenue_profit_url = "/movie_profit_rating_2014";
  selected = color_mapper[4].year; //2014
  console.log("Selected year: " + selected);
  makeResponsive();
}

function handle_2013_ButtonClick() {
  movie_revenue_profit_url = "/movie_profit_rating_2013";
  selected = color_mapper[5].year; //2013
  console.log("Selected year: " + selected);
  makeResponsive();
}

//Update scatter plot based on user choice 


// Update the plot with new data
function updatePlotly(newdata, chart_element) {
    var Bar = document.getElementById(chart_element);
    Plotly.restyle(Bar, 'x', [newdata.x])
    Plotly.restyle(Bar, 'y', [newdata.y])
}

// Get new data whenever the dropdown selection changes for both bar elements 
function getData(route) {
    console.log(route);
    Plotly.d3.json(`/${route}`, function(error, data) {
        console.log("newdata", data);
        if (route.search(new RegExp('total', 'i')) == -1) {
          updatePlotly(data, 'bar');  
        } else {
          updatePlotly(data, 'bar2');
        }
    });
}

function getDataForYears(route) {


}

// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);

// window.onresize = function() {

//   var Bar = document.getElementById('bar');
//   var Bar2 = document.getElementById('bar2');
  
//   Plotly.Plots.resize(Bar);
//   Plotly.Plots.resize(Bar2);
// };

// When the browser loads, makeResponsive() is called.
makeResponsive();



function makeResponsive() {

  //var Bar = document.getElementById('bar');
  //var Bar2 = document.getElementById('bar2');
  
  //Plotly.Plots.resize(Bar);
  //Plotly.Plots.resize(Bar2);

  // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width and height of the browser window.
  //var svgWidth = window.innerWidth - 100;
  //var svgHeight = window.innerHeight - 100;

  console.log("svg Width: " + svgWidth);
  console.log("svg Height: " + svgHeight);
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
  //movie_revenue_profit_url = "/movie_profit_rating";
  console.log(movie_revenue_profit_url);

  d3.json(movie_revenue_profit_url, function(error, moviedata) {
  //d3.csv("hairData.csv", function(err, hairData) {
    if (error) throw err;
    console.log(moviedata);

    moviedata.forEach(function(data) {
      data.revenue = parseFloat(data.revenue);
      data.rating = parseFloat(data.rating);
      data.profit = parseFloat(data.profit);
      data.release_date = String(data.release_date);
      
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
        return parseFloat(data[dataColumnX]) * 0.8;
      });

      xMax = d3.max(moviedata, function(data) {
        return parseFloat(data[dataColumnX]) * 1.1;
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


    function getColorCode(date_string) {

      //Get last 2 digits of date string
      var year = date_string.slice(-2);
      console.log("Date string: " + date_string + " Last two digits of year: " + year );

      switch (year) {
        case ((color_mapper[5].year).slice(-2)):
          console.log("Color mapping year: " + (color_mapper[5].year).slice(-2));
          return color_mapper[5].color;
        case ((color_mapper[4].year).slice(-2)):
          console.log("Color mapping year: " + (color_mapper[4].year).slice(-2));
          return color_mapper[4].color;
        case ((color_mapper[3].year).slice(-2)):
          console.log("Color mapping year: " + (color_mapper[3].year).slice(-2));
          return color_mapper[3].color;
        case ((color_mapper[2].year).slice(-2)):
          console.log("Color mapping year: " + (color_mapper[2].year).slice(-2));
          return color_mapper[2].color;
        case ((color_mapper[1].year).slice(-2)):
          console.log("Color mapping year: " + (color_mapper[1].year).slice(-2));
          return color_mapper[1].color;
        default:
          return color_mapper[0].color;
      }
    }
    /*
    // Initialize tooltip
    var toolTip = d3
      .tip()
      .attr("class", "tooltip")
      //.transition()   
      //.duration(200)    
      .style("opacity", .9)
      // Define position
      .offset([80, -60])
      // The html() method allows us to mix JavaScript with HTML in the callback function
      // "http://image.tmdb.org/t/p/w185/" - For image of movie
      .html(function(data) {
        var movieTitle = data.original_title;
        // var bandName = data.rockband;
        var revenue = parseFloat(data.revenue);
        var profit = parseFloat(data.profit);
        var movieHomepage = data.homepage;
        var movie_poster_path = data.poster_path;
        
        // Tooltip text depends on which axis is active/has been clicked
        var revenueString = "Revenue: ";
        var profitString = "Profit: ";
        // TODO: Add poster path link: http://image.tmdb.org/t/p/w185/ 
        //if (currentAxisLabelX === "hair_length") {
        // bandString = "Hair length: ";
        //}
        //else {
        //  bandString = "Number of albums: ";
        //} 
        //<a href="https://www.w3schools.com">Visit W3Schools.com!</a>
        return '<a href="' + movieHomepage+ '">' + movieTitle + '</a>' + '<hr>' +
          '<br>' +
          revenueString + revenue + '<br>' +
          profitString + profit  + '<br>' +
          '<hr><br>'; //TO DO: Add Image poster pth later +
          //numHits;
      });  */

      //var divToolTip = d3.select("body")
      //                    .append("div")
      //                    .attr("class", "tooltip")
      //                    .style("opacity", 0);

      var divToolTip = d3.select(".tooltip")
                          .style("opacity", 0);      

    // Create tooltip
    //chart.call(toolTip);

    
    chart
      .selectAll("circle")
      .data(moviedata)
      .enter()
      .append("circle")
      .attr("cx", function(data, index) {
        console.log(data);
        return xLinearScale(parseFloat(data[currentAxisLabelX]));
      })
      .attr("cy", function(data, index) {
        return yLinearScale(parseFloat(data.rating));
      })
      .attr("r", function(data, index) {
        //TODO: Check and update this 
        //return ((parseFloat(data.revenue)/100000) * 0.02);
        //.style("fill", "orange");
        var radius = parseFloat(data[currentAxisLabelX])/ 100.0;
        console.log("Radius: "+ radius);
        return radius;
      })
      //.attr("fill", "#E75480") 
      .attr("fill", function(data, index) {
        var colorCode = getColorCode(data.release_date);
        return colorCode;
      })
      // display tooltip on click
      .on("mouseover", function(data, index) {
        //d3.select(this).transition().attr("fill", "#800080");

        divToolTip.transition()
                  .duration(2000) //longer to easier be seen
                  .style("opacity", 0.9); //this is for the tooltip

        //Prep the text to show on mouse over
        var movieTitle = data.original_title;
        var revenue = parseFloat(data.revenue);
        var profit = parseFloat(data.profit);
        var movieHomepage = data.homepage;
        var movie_poster_path = data.poster_path; //).trim().toLowerCase();
        //console.log()
        /*if (movie_poster_path) {
          movie_poster_path = "http://image.tmdb.org/t/p/w185" + movie_poster_path;
        } */
        var revenueString = "Revenue: $";
        var profitString = "Profit: $";

        var text = '<a href="' + movieHomepage+ '">' + movieTitle + '</a>' + '<hr>' + '<br>' +
                      revenueString + revenue + ' (in million)<br>' + profitString + profit  + ' (in million)<br>' +
                      '<hr><br>' +
                      '<div class="col-lg-3"><img src="http://image.tmdb.org/t/p/w185' + 
                      movie_poster_path +  '" class="center-block" align="middle"</div>'; //TO DO: Add Image poster pth later +
        
        console.log("Tool Tip-" + text + " DataPoint: " + data.revenue + ' ' + profit + ' ' + movieTitle + ' ' + movie_poster_path);
        divToolTip.html(text)
                  .style("left", (d3.event.pageX)+"px")
                  .style("top", (d3.event.pageY-28) + "px")
                  .attr("fill", "steelblue");
        /*divToolTip.html(text)
                  .style("left", (d3.select(this).attr("cx")) +"px")
                  .style("top", (d3.select(this).attr("cy"))  + "px")
                  .attr("fill", "steelblue"); */

        //toolTip.show(data);
      }) 
      /*
      .on("click", function(data) {
        
        divToolTip.transition()
                  .duration(2000) //longer to easier be seen
                  .style("opacity", 0.9); //this is for the tooltip

        //Prep the text to show on mouse over
        var movieTitle = data.original_title;
        var revenue = parseFloat(data.revenue);
        var profit = parseFloat(data.profit);
        var movieHomepage = data.homepage;
        var movie_poster_path = data.poster_path;
        var revenueString = "Revenue: ";
        var profitString = "Profit: ";

        var text = '<a href="' + movieHomepage+ '">' + movieTitle + '</a>' + '<hr>' + '<br>' +
                      revenueString + revenue + ' ($ in million)<br>' + profitString + profit  + ' ($ in million)<br>' +
                      '<hr><br>'; //TO DO: Add Image poster pth later +
        console.log("Tool Tip-" + text + " DataPoint: " + data.revenue + ' ' + profit + ' ' + movieTitle);
        divToolTip.html(text)
                  .style("left", (d3.event.pageX)+"px")
                  .style("top", (d3.event.pageY-28) + "px")
                  .attr("fill", "steelblue");


        //toolTip.show(data);
      }) */
      // // hide tooltip on mouseout
      .on("mouseout", function(data, index) {
        //d3.select(this).transition().attr("fill", "#E75480");
        //toolTip.hide(data);
        console.log(divToolTip);
        divToolTip.transition().duration(500).style("opacity", 0); 
      });

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
              return xLinearScale(parseFloat(data[currentAxisLabelX]));
            })
            .duration(1800);
        });

        // Change the status of the axes. See above for more info on this function.
        labelChange(clickedSelection);
      }
    });
  });
}
