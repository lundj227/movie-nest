// Placeholder for API base URL and API key
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '52c4202be8f44cf677f9d30d911e391b';

// Function to search for movies using TMDb API
async function searchMovies(query) {
  try {
    // Fetch movie data based on the search query
    const response = await fetch(`${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();

    // Clear existing movie results
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';

    // Iterate through the fetched movie results
    data.results.forEach((movie) => {
      // Create movie card
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.dataset.movieId = movie.id;

      // Create movie title
      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.title;

      // Create movie image
      const movieImage = document.createElement('img');
      movieImage.alt = `${movie.title} Poster`;
      if (movie.poster_path) {
        movieImage.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
      } else {
        // Provides a placeholder image if no poster_path is available
        movieImage.src = 'https://i.ebayimg.com/images/g/kykAAOSwpDdVGcih/s-l400.jpg'; 
      }

      // Create movie overview
      const movieOverview = document.createElement('p');
      movieOverview.classList.add('movie-overview');
      movieOverview.textContent = movie.overview;

      // Create favorite button
      const favoriteButton = document.createElement('button');
      favoriteButton.classList.add('favorite-button');
      favoriteButton.dataset.movieId = movie.id;
      favoriteButton.textContent = 'Favorite';

      // Add event listener to the favorite button
      favoriteButton.addEventListener('click', () => {
        markAsFavorite(movie.id);
      });

      // Append elements to movie card
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieOverview);
      movieCard.appendChild(favoriteButton);

      // Append movie card to movie results
      movieResults.appendChild(movieCard);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}
// Function to mark a movie as favorite
function markAsFavorite(movieId) {
  // Get the current list of favorite movies from localStorage
  let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  // Check if the movie is already in the favorites list
  if (!favoriteMovies.includes(movieId)) {
    // If not, add it to the list
    favoriteMovies.push(movieId);

    // Update the favorite movies in localStorage
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

    // Disable the favorite button and change its text
    const favoriteButton = document.querySelector(`[data-movie-id="${movieId}"]`);
    if (favoriteButton) {
      favoriteButton.disabled = true;
      favoriteButton.textContent = 'Favorited';
    }
  }
}

// Function to update favorite buttons for dynamically added movies
function updateFavoriteButtons() {
  const favoriteMovies = getFavoriteMovies();
  favoriteMovies.forEach((movieId) => {
    const favoriteButton = document.querySelector(`[data-movie-id="${movieId}"]`);
    if (favoriteButton) {
      favoriteButton.disabled = true;
      favoriteButton.textContent = 'Favorited';
    }
  });
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput').value;
  searchMovies(searchInput);
});

document.addEventListener('DOMContentLoaded', () => {
  // Event listener for the search button
  document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    searchMovies(searchInput);
  });

  // Prevent the default form submission behavior when the search button is clicked
  document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
  });

  // Attach event listeners to favorite buttons for dynamically added movies
  const movieResults = document.getElementById('movieResults');
  movieResults.addEventListener('click', (event) => {
    if (event.target.classList.contains('favorite-button')) {
      const movieId = event.target.dataset.movieId;
      markAsFavorite(movieId);
    }
  });
});
