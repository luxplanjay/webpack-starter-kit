import axios from 'axios';
import updateMarkupGallery from './updateMarkup';
import modalTpl from '../templates/modal.hbs';
import debounce from 'lodash.debounce';
import renderOnSearch from './renderOnSearch';

// данные для запроса
const token = '6b8ef447c2ce3d010bfcc7f710d71588';
let page = 1;
const popularMoviesURL = `https://api.themoviedb.org/3/trending/movie/day`;

//массив жанров с их идентификаторами
const genres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
//форма поиска и слушатель на ней
const inputSearch = document.querySelector('.search__input');
inputSearch.addEventListener('input', debounce(onSearch, 300));


const searchOpen = document.querySelector('.search__container');
searchOpen.addEventListener('click',openInputSearch);

//кнопка поиска закрывается только при пустом инпуте
function openInputSearch(){
  inputSearch.classList.add('search__input--active');
}
//предупредительное сообщение об ошибке
const errorWarning = document.querySelector('.search__warning');
const message = {
  manyMatches: 'Too many matches found. Please enter a more specific query!',
  notFound: 'No results were found for your search',
  incorrectQuery: 'You entered an incorrect movie name',
  serverError:
    'An error occurred on the server during processing. Please try again later',
};

//базовая функция запроса списка фильмов
const fetchFilms = async (moviesURL, callbackTemplate, searchQuery = '') => {
   try {
     console.log(page);
    const { data: { results } } = await axios.get(`${moviesURL}?api_key=${token}&page=${page}&query=${searchQuery}`);
    console.log(results);
    if (results.length === 0) {
      errorWarning.textContent = message.notFound;
      return;
    }
    //то что было раньше - при загрузке страници все жанры отображались
    // const changeGenre = [...results].map(el => genresMovie(el));
    const changeGenre = [...results].map(el => genresMovieShort(el));
    page += 1;
    return renderListFilms(changeGenre, callbackTemplate);
  } catch (error) {
    if (error.response.status === 422) {
      errorWarning.textContent = message.incorrectQuery;
    }
    if (error.response.status >= 500) {
      errorWarning.textContent = message.serverError;
    } else {
      console.log(error);
    }
  }
};
//преобразование id жанров в названия
// function genresMovie(element) {
//   element.genre_ids = element.genre_ids
//     .map(genreMovie => (genreMovie = genres[genreMovie]))
//     .join(',');
//   return element;
// }
//====================================================
//дает возможность вывести на главной странице не больше 3ч жанров, а в модалке прописаны все
function genresMovieShort(element) {
  element.genre_ids = element.genre_ids
    .map(genreMovie => (genreMovie = genres[genreMovie]))
    .slice(0, 3)
    .join(', ');
  return element;
}
//====================================================
function renderListFilms(arrayFilms, template) {
  return template(arrayFilms);
}
//функция поиска по ключевому слову
let oldValueInput = '';

function onSearch() {
  errorWarning.textContent = '';
  if (inputSearch.value.length >= 3) {
    if(inputSearch.value.length != oldValueInput.length ) {
    page = 1;
    document.querySelector('.image-slider').innerHTML = '';
    }
    oldValueInput = inputSearch.value;
    let searchQuery = inputSearch.value.trim();
    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie`;
    fetchFilms(searchMoviesURL, renderOnSearch, searchQuery);
  }

  if (inputSearch.value.length > 0 && inputSearch.value.length < 3) {
    errorWarning.textContent = message.manyMatches;
    document.querySelector('.image-slider').innerHTML = '';
    page = 1;
  }
  if (inputSearch.value === '') {
    fetchFilms(popularMoviesURL, updateMarkupGallery);
    return;
  }
}

//функция запроса информации о фильме
const fetchInfoFilm = async movieID => {
  const infoMovieURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${token}`;
  try {
    const { data } = await axios.get(infoMovieURL);
    const markupModal = modalTpl(data);
    return markupModal;
  } catch (error) {
    if (!error.response) {
      console.error(error);
      return;
    }
    if (error.response.status === 404) {
      console.error(message.notFound);
    }
    if (error.response.status >= 500) {
      console.error(message.serverError);
    }
  }
};

//стартовый запрос популярных фильмов
fetchFilms(popularMoviesURL, updateMarkupGallery);




export {fetchInfoFilm, fetchFilms, onSearch};

