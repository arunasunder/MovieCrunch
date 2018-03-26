var movieidlist = [];
console.log(movieidlist);
var title_list = [];
var rev_list = [];
var rating_list = [];
function buildplot(array1,array2){
        //console.log(array1)
        test = array1
        var trace1 = {  
            labels: array2,
            values: test,  
            type: 'pie'
            }
        var data = [trace1];
        //console.log("data is here",test);
        Plotly.newPlot('pie_chart', data);
    }
function build2plot(array3,array4){
    // Create the Trace
        var trace2 = {
            x: array3,
            y: array4,
            type:"bar"
        };
        // Create the data array for our plot
        var data2 = [trace2];
        // Define our plot layout
        var layout2 = {
            title: "Movie Chart"
        };
        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar-plot", data2, layout2)
};

    var key = "84ef22f5d85f87fb669625c2771b6737"
    var queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=84ef22f5d85f87fb669625c2771b6737";


    
    d3.json(queryURL, function (error, response) {
        
        console.log("queryURL", response);
        for (i = 0; i < 4; i++) {
            var movie_id = response.results[i].id;
            movieidlist.push(movie_id)
        }


    for(var i = 0; i < movieidlist.length;i++){
          
            queryURL2 = "https://api.themoviedb.org/3/movie/"+movieidlist[i]+"?api_key=84ef22f5d85f87fb669625c2771b6737";
            //console.log(queryURL2);
          
            d3.json(queryURL2, function(error, response){
                    //console.log(queryURL2, response);
                    var title = response.title;
                    title_list.push(title);
                    var rev_info = response.revenue;
                    rev_list.push(rev_info);
                    var release_date = response.release_date;
                    var poster_img = response.poster_path;
                    var rating = response.vote_average;
                    rating_list.push(rating);
                    
                

                    
                    d3.select("#card1")
                        .append("div")
                        .attr("class", "col-lg-3")
                        .append("img")
                        .attr("src", "http://image.tmdb.org/t/p/w185/"+poster_img)
                        .attr("align","middle");
                    d3.select("#card2")
                        .append("div")
                        .attr("class", "col-lg-3")
                        .append("p")
                        .attr("class", "card_text")
                        .html("<b>"+title+"</b><br></br>Released: "+release_date+"<br></br><p>Cruncher Rating: "+rating+"<br>Find Tickets: ")
                    buildplot(rev_list,title_list);
                    build2plot(title_list, rating_list);
                    
                });
                
                
    };

    })

    console.log(movieidlist);


          

    var queryURL3 = "https://api.themoviedb.org/3/movie/upcoming?api_key=84ef22f5d85f87fb669625c2771b6737";

    
    d3.json(queryURL3, function (error, response) {
        //console.log("queryURL3", response);
        
        for (w = 0; w < 4; w++) {
            var cs_title = response.results[w].title;
            var cs_release_date = response.results[w].release_date;
            var movie_id = response.results[w].id;
            var rating_id = response.results[w].vote_average;
            d3.select("#coming_soon").append("tr").html("<td>"+cs_title+"</td><td>"+cs_release_date+"</td><td>"+rating_id+"</td>");
            //console.log(cs_title);
            //console.log(cs_release_date);
            //console.log(movie_id);
            
        };
    });