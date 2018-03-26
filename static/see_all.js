$("#see_all").on("click", function(y){
   
      // window.open("search.html","_self")
        $(".elem1").remove()
        d3.select("#search_text").append("h2").html("Movies Now Playing");


        var seeallURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=84ef22f5d85f87fb669625c2771b6737";

       d3.json(seeallURL, function(error, response){
           for (i=0; i<seeallURL.length; i++){
                var see_movie_title = response.results[i].title;
               var see_poster_image = response.results[i].poster_path;
               var see_overview = response.results[i].overview;
               var see_release_date = response.results[i].release_date;
               
               d3.select("#search_results").append("img").attr("src","http://image.tmdb.org/t/p/w185/"+see_poster_image).attr("alt", "Sorry, No Image")
               d3.select("#search_results").append("p").html("<b>Title:</b> <i>"+see_movie_title+"</i><br><b>Release Date:</b> "+see_release_date+ "<br><b>Description:</b> "+see_overview+"<hr>");
               //d3.select("#search_results").append("br")
               
              /* d3.select("#search_results").append("div").attr("Class", "col-lg-3").html("<p>"+s_movie_title+"</p>");
               var id_tracker = id_tracker+1;
               console.log(id_tracker);*/
               
               
           };
           
       })
    });
    
    
    
    

    
