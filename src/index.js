import './sass/main.scss';
// import './js/teamLightbox';
// import './js/custom';
import MoviePagination from './js/pagination/moviePagination';

// const galRef = document.querySelector('.gal');
const prevRef = document.querySelector('.prev');
const nextRef = document.querySelector('.next');



const movie = new MoviePagination('.gal');
movie.getAllGenres();
// console.log(movie.fetchMovies());
// movie.mount();
movie.loadFirst();
// movie.goToPrevPage();
// movie.goToNextPage();

prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);