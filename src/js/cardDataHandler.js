import apiService from './apiSearchFetch.js';
import posterPlaceholder from '../img/image-placeholder.jpg';

const allGenres = [];
getAllGenres();
export default function getCardData(results) {
  results.map(result => {
    result.release_date = setDate(result.release_date);
    result.poster_path = setPoster(result.poster_path);
    result.genre_ids = genresFilter(allGenres, result.genre_ids);
    return result;
  });
  return results;
}
function genresFilter(data, genreIds) {
  const filtredData = data.filter(genre =>
    genreIds.find(genreId => genre.id === genreId),
  );
  return setGenres(filtredData);
}
function getAllGenres() {
  apiService.fetchGenres().then(data => {
    return data.map(genre => allGenres.push(genre));
  });
}
function setPoster(data) {
  return !data ? posterPlaceholder : `https://image.tmdb.org/t/p/w342/${data}`;
}
function setDate(data) {
  return !data ? 'Unknown Release Date' : data.slice(0, 4);
}
function setGenres(data) {
  const reqGenres = [];
  data.map(res => reqGenres.push(` ${res.name}`));
  if (reqGenres.length > 3) {
    reqGenres.splice(2);
    reqGenres.push(' Other');
  } else if (reqGenres.length === 0) {
    reqGenres.push('Unknown Genre');
  }
  reqGenres.toString().trim();
  return reqGenres;
}
