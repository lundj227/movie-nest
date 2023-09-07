$(document).ready(function () {

  function movieCard(){

    const apiKey = "eb4717d6311a7fd537d9d6bdfc76c132";
    // using jquery to pull the api(could also use fetch)
    $.ajax({
      type: "GET",
      url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
      imageUrl:'https://api.themoviedb.org/3/movie/movie_id/images',
      dataType: "json",
    }).then((data) => {
      // console log so you can see what you need to filter through
      console.log(data);
      // identifies where to place the cards
      var cardGrid = $('#card-grid');
      // runs a funciton for each movie
      data.results.forEach(function(movie , i) {
         if(i < 20){
          // cards are being built dynamically
          // using i because the information is in an array
             var cardDivider = $('<p>').addClass('title').text(data.results[i].title);
             var rating =  $('<p>').addClass('rating').text( "Rating: " + data.results[i].vote_average);
             var ratingTitleContainer = $('<div>').addClass('rating-title-container')
              var cardCell = $('<div>').addClass('cell');
              var card = $('<div>').addClass('card');
              var cardSection = $('<div>').addClass('card-section').text(data.results[i].overview);
              var img = $('<img>').addClass('movie-image')
              var imagePath = "https://image.tmdb.org/t/p/original/" + data.results[i].poster_path;
              // adding all the pieces to the html 
              img.attr('src', imagePath);
              ratingTitleContainer.append(cardDivider,rating)
              card.append(ratingTitleContainer);
              card.append(img)
              card.append(cardSection);
              cardCell.append(card);
              cardGrid.append(cardCell);
          }
         
      });
  
    });
  }
  // calling the function
  movieCard();
});


