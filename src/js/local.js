const libraryBtn = document.querySelector('.my-library');
const homeBtn = document.querySelector('.library-home');
const libraryRef = document.querySelector('.library-page');
const headerRef = document.querySelector('.main-page');
const modalRef = document.querySelector('.modal');
const galleryContainer = document.querySelector('.image-slider');
import updateMarkupGallery from './updateMarkup';
import galleryItem from '../templates/galleryItem.hbs';

import { popularMoviesURL, fetchInfoFilm, fetchFilms } from './apiService';

let arrayWatchedFilms = [];
const localArrayWatchedFilms = localStorage.getItem('arrayWatchedFilm');
if (localArrayWatchedFilms) {
  arrayWatchedFilms = JSON.parse(localArrayWatchedFilms);
}

libraryBtn.addEventListener('click', () => {
  libraryRef.style.display = 'block';
  headerRef.style.display = 'none';
  galleryContainer.innerHTML = '';
  const libraryWatched = document.querySelector('.library-watched');
  libraryWatched.addEventListener('click', () => {
    galleryContainer.innerHTML = '';

    async function getElement(arr, parent) {
      let itemElementList = await arr.reduce(async (acc, el) => {
        let list = await acc;
        const movieMarkup = await fetchInfoFilm(el, galleryItem);
        list += movieMarkup;
        return list;
      }, '');
      return parent.insertAdjacentHTML('afterbegin', itemElementList);
    }

    getElement(arrayWatchedFilms, galleryContainer);
  });
});

homeBtn.addEventListener('click', () => {
  libraryRef.style.display = 'none';
  headerRef.style.display = 'block';
  fetchFilms(popularMoviesURL, updateMarkupGallery);
});

const addWatchedFilms = movieId => {
  if (arrayWatchedFilms.includes(movieId)) {
    const idFilm = arrayWatchedFilms.indexOf(movieId);
    arrayWatchedFilms.splice(idFilm, 1);

    localStorage.setItem('arrayWatchedFilm', JSON.stringify(arrayWatchedFilms));
    return;
  }
  arrayWatchedFilms.push(movieId);
  localStorage.setItem('arrayWatchedFilm', JSON.stringify(arrayWatchedFilms));
};

export default { addWatchedFilms, arrayWatchedFilms };
