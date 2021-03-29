import PopularFilms from '../API/fetchPopular';
import Genre from '../API/fetchGenre';

const galleryRef = document.querySelector('.movies__list');

const fetchGenre = new Genre();
const fetchPopularMovie = new PopularFilms(
  fetchGenre.createGenreTranpiler,
  galleryRef,
);
