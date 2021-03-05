//подключение axios (надо загрузить в проект)
import axios from 'axios';

// данные для запроса
const token = "6b8ef447c2ce3d010bfcc7f710d71588";
let page = 1;
const baseURL = `api_key=${token}&page=${page}`;
const popularMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?${baseURL}`;

//массив жанров с их идентификаторами
const genres = {
    28: "Action",
 12: "Adventure",
 16: "Animation",
 35: "Comedy",
 80: "Crime",
 99: "Documentary",
 18: "Drama",
 10751: "Family",
 14: "Fantasy",
 36: "History",
 27: "Horror",
 10402: "Music",
 9648: "Mystery",
 10749: "Romance",
 878: "Science Fiction",
 10770: "TV Movie",
 53: "Thriller",
 10752: "War",
 37: "Western"
}
 


//форма поиска и слушатель на ней
const inputSearch = document.querySelector('.search__input');
inputSearch.addEventListener('input', onSearch);

//предупредительное сообщение об ошибке
const errorWarning = document.querySelector('.search__warning');
const message = {
    manyMatches: 'Too many matches found. Please enter a more specific query!',
    notFound: 'No results were found for your search',
    incorrectQuery: 'You entered an incorrect movie name',
    serverError: 'An error occurred on the server during processing. Please try again later',
}

//базовая функция запроса списка фильмов
const fetchFilms = async (moviesURL) => {
    const response = await axios.get(moviesURL)
    .then(({data : {results}}) => {
         if(results.length === 0) {
             errorWarning.textContent = message.notFound;
             return;
         }
        const changeGenre = [...results].map(el => genresMovie(el));
        console.log(changeGenre);
        page += 1;
    return changeGenre;
})
    .catch (error => {
        if(error.response.status === 422) {
            errorWarning.textContent = message.incorrectQuery;
        } 
        if(error.response.status >= 500) {
            errorWarning.textContent = message.serverError;
        } 
        else {
        console.log(error)}
    })
}
//преобразование id жанров в названия
function genresMovie(element) {
    element.genre_ids = element.genre_ids.map(genreMovie => genreMovie = genres[genreMovie]).join(',');
    return element;
}
//функция поиска по ключевому слову
function onSearch(){
    errorWarning.textContent = '';
    if(inputSearch.value.length === 0){
        fetchFilms(popularMoviesURL);
    }
    if(inputSearch.value.length > 0 && inputSearch.value.length < 3){
        errorWarning.textContent = message.manyMatches;
    }
    if(inputSearch.value.length >= 3){
    let searchQuery = inputSearch.value.trim();
    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie?${baseURL}&query=${searchQuery}`;
    fetchFilms(searchMoviesURL);
}
}

//функция запроса информации о фильме
const fetchInfoFilm = async (movieID) => {
    const infoMovieURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${token}`;
    const response = await axios.get(infoMovieURL);
}
const movieID = 512896;
fetchInfoFilm(movieID);

//стартовый запрос популярных фильмов
   fetchFilms(popularMoviesURL);
   
  