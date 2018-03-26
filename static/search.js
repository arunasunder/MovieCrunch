$("#movie_search").on("keyup", function(e){
   if(e.keyCode == 13){
      // window.open("search.html","_self")
        $(".elem1").remove()
        var movie_name = d3.select("#movie_search").node().value; 
        d3.select("#search_text").append("h2").html("Search Results: "+movie_name);


        console.log(movie_name);
        var searchQuery = "https://api.themoviedb.org/3/search/movie?api_key=84ef22f5d85f87fb669625c2771b6737&language=en-US&query="+movie_name+"&page=1&include_adult=false"
        console.log(searchQuery);
       var id_tracker =0;
       d3.json(searchQuery, function(error, response){
           for (i=0; i<searchQuery.length; i++){
                var s_movie_title = response.results[i].title;
               console.log(s_movie_title);
               var s_poster_image = response.results[i].poster_path;
               var s_overview = response.results[i].overview;
               var s_release_date = response.results[i].release_date;
               
               d3.select("#search_results").append("img").attr("src","http://image.tmdb.org/t/p/w185/"+s_poster_image).attr("alt", "Sorry, No Image")
               d3.select("#search_results").append("p").html("<b>Title:</b><i>"+s_movie_title+"</i><br><b>Release Date:</b> "+s_release_date+ "<br><b>Description:</b> "+s_overview+"<hr>");
               //d3.select("#search_results").append("br")
               
              /* d3.select("#search_results").append("div").attr("Class", "col-lg-3").html("<p>"+s_movie_title+"</p>");
               var id_tracker = id_tracker+1;
               console.log(id_tracker);*/
               
               
           };
           
       })
   };
    });
    
    
    
    

    
