const apiToken = 'bed11f3e85eaa880677d01c2a59b291d';
const apiBaseUrl = 'https://api.themoviedb.org/3';

document.addEventListener('DOMContentLoaded', () => {
    loadBannerMovie();
    loadMovies('popular', 'popular-movies');
    loadMovies('top_rated', 'top-rated-movies');
    loadMovies('upcoming', 'upcoming-movies');
});

async function loadBannerMovie() {
    const response = await fetch(`${apiBaseUrl}/movie/popular?api_key=${apiToken}`);
    const data = await response.json();
    const bannerMovie = data.results[0];
    const bannerElement = document.getElementById('banner');
    bannerElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`;
    bannerElement.querySelector('.banner-content').innerHTML = `
        <h1>${bannerMovie.title}</h1>
        <p>${bannerMovie.overview}</p>
    `;
}

async function loadMovies(category, containerId) {
    const response = await fetch(`${apiBaseUrl}/movie/${category}?api_key=${apiToken}`);
    const data = await response.json();
    const movies = data.results;
    const movieContainer = document.getElementById(containerId);
    movieContainer.innerHTML = movies.map(movie => `
        <div class="movie">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p>${movie.overview}</p>
            </div>
            <div class="movie-rating">
                <span>${movie.vote_average}</span>
            </div>
        </div>
    `).join('');
}
