import MoviePagination from '../pagination/moviePagination';

const prevRef = document.querySelector('.prev');
const nextRef = document.querySelector('.next');

const movie = new MoviePagination('.movies-list');
movie.init();

prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);
