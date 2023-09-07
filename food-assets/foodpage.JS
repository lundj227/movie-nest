

const checkbtn = document.getElementById('check');
const navbar = document.getElementById('navbar')
checkbtn.onclick = function() {
    checkbtn.classList.toggle("active")
    navbar.classList.toggle("active")
}


$(document).ready(function () {
    function snack (){
        const api_key = "6af019fb829442fdb7e4a508e80a9deb"
      // using jquery to pull the api(could also use fetch)
    $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/food/products/search?query=yogurt&apiKey=${api_key}`,
        imageUrl:'https://api.themoviedb.org/3/movie/movie_id/images',
        dataType: "json",
    }).then((data) => {
        // console log so you can see what you need to filter through
        console.log(data);
        // identifies where to place the cards
        var cardGrid = $('#card-grid');
        // runs a funciton for each movie
        data.results.forEach(function(snack , i) {
            if(i < 20){
            // cards are being built dynamically
            // using i because the information is in an array
                var cardDivider = $('<p>').addClass('card-divider text-center').text(data.products[i].title);
                var cardCell = $('<div>').addClass('cell');
                var card = $('<div>').addClass('card');
                var img = $('<img>').addClass('movie-image')
                var imagePath = "https://image.tmdb.org/t/p/original/" + data.products[i].image;
                // adding all the pieces to the html
                img.attr('src', imagePath);
                card.append(cardDivider);
                card.append(img)
                cardCell.append(card);
                cardGrid.append(cardCell);
            }
        });
        });
    }
    // calling the function
    snack();
});