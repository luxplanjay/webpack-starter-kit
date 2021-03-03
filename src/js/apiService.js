//подключение axios (надо загрузить в проект)
import axios from 'axios';

// данные для запроса
const token = '6b8ef447c2ce3d010bfcc7f710d71588';
let page = 1;
const baseURL = `api_key=${token}&page=${page}`;

//форма поиска и слушатель на ней
const inputSearch = document.querySelector('#search-form');
inputSearch.addEventListener('submit', event => onSearch(event));

//базовая функция запроса списка фильмов
const fetchFilms = async moviesURL => {
  const response = await axios
    .get(moviesURL)
    .then(({ data: { results } }) => {
      console.log(results);
      page += 1;
      return results;
    })
    .catch(error => console.log('ОШИБКА ОШИБКА ОШИБКА'));
};

//функция поиска по ключевому слову
function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.elements.query.value.length >= 1) {
    let searchQuery = form.elements.query.value;
    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie?${baseURL}&query=${searchQuery}`;
    fetchFilms(searchMoviesURL);
  }
}

//функция запроса информации о фильме
const fetchInfoFilm = async movieID => {
  const infoMovieURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${token}`;
  const response = await axios.get(infoMovieURL);
  console.log(response);
};
const movieID = 512896;
fetchInfoFilm(movieID);

//стартовый запрос популярных фильмов
const popularMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?${baseURL}`;
fetchFilms(popularMoviesURL);
