//подключение axios (надо загрузить в проект)
import axios from 'axios';

//массив жанров с их идентификаторами
const genres = [
   {id: 28, name: "Action"},
{id: 12, name: "Adventure"},
{id: 16, name: "Animation"},
{id: 35, name: "Comedy"},
{id: 80, name: "Crime"},
{id: 99, name: "Documentary"},
{id: 18, name: "Drama"},
{id: 10751, name: "Family"},
{id: 14, name: "Fantasy"},
{id: 36, name: "History"},
{id: 27, name: "Horror"},
{id: 10402, name: "Music"},
{id: 9648, name: "Mystery"},
{id: 10749, name: "Romance"},
{id: 878, name: "Science Fiction"},
{id: 10770, name: "TV Movie"},
{id: 53, name: "Thriller"},
{id: 10752, name: "War"},
{id: 37, name: "Western"}
]
// данные для запроса
const token = "6b8ef447c2ce3d010bfcc7f710d71588";
let page = 1;
const baseURL = `api_key=${token}&page=${page}`;

//форма поиска и слушатель на ней
const inputSearch = document.querySelector('#search-form');
inputSearch.addEventListener('submit', event => onSearch(event));

//базовая функция запроса списка фильмов
const fetchFilms = async (moviesURL) => {
    const response = await axios.get(moviesURL)
    .then(({data : {results}}) => {
         if(results.length === 0) {
             console.log("По Вашему запросу ничего не найдено");
             return;
         }
        console.log(results);
        page += 1;
        return results
})
    .catch (error => {
        if(error.response.status === 422) {
            console.log(error);
            console.log("Вы ввели некорректное название фильма");
        } else {
        console.log(error)}
    })
}

//функция поиска по ключевому слову
function onSearch(event){
    event.preventDefault();
    const form = event.currentTarget;
    if(form.elements.query.value.length >= 1){
    let searchQuery = form.elements.query.value;
    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie?${baseURL}&query=${searchQuery}`;
    fetchFilms(searchMoviesURL);
}}

//функция запроса информации о фильме
const fetchInfoFilm = async (movieID) => {
    const infoMovieURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${token}`;
    const response = await axios.get(infoMovieURL);
}
const movieID = 512896;
fetchInfoFilm(movieID);

//стартовый запрос популярных фильмов
const popularMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?${baseURL}`;
    fetchFilms(popularMoviesURL);
