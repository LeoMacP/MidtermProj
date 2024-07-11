const apiKey = 'fbeb437172000a6ad55a0b492c8ca003';
const popMovieSec = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
const topRated = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;
const upcomingMoviesSec = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`;

let genres = [];

// Fetch genres and store inside an array
async function fetchGenres() {
    try {
        const response = await fetch(genreUrl);
        const data = await response.json();
        genres = data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

// Get genre names from genre IDs
function getGenreNames(genreIds) {
    return genreIds.map(id => {
        const genre = genres.find(genre => genre.id === id);
        return genre ? genre.name : 'Unknown';
    }).join(', ');
}


// MOVIE DISPLAY PART!!!
async function fetchMovies(url, containerId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, containerId);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
        const genreNames = getGenreNames(movie.genre_ids);
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-tile';
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${new Date(movie.release_date).toLocaleDateString()}</p>
            <p>Overview: ${movie.overview}</p>
            <p>Genres: ${genreNames}</p>
        `;
        container.appendChild(movieElement);
    });
}


async function init() {
    await fetchGenres();
    fetchMovies(popMovieSec, 'popular-movies');
    fetchMovies(topRated, 'top-rated-movies');
    fetchMovies(upcomingMoviesSec, 'upcoming-movies');
}

document.addEventListener('DOMContentLoaded', init);