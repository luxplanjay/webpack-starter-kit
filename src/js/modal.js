import './fetch';
import './refs';
import refs from './refs';
import pathForModal from './addContent';


function updateModalValue(obj) {
  refs.modalTitle.textContent = obj.title;
  refs.modalImg.src = obj.poster_path
    ? `https://image.tmdb.org/t/p/w500/${obj.poster_path}`
    : './images/default.jpg';
  refs.rate.textContent = obj.vote_average;
  refs.votes.textContent = obj.vote_count;
  refs.popularity.textContent = obj.popularity;
  refs.title.textContent = obj.original_title;
  refs.genre.textContent = genresSep(obj);
  refs.descr.textContent = obj.overview;
  // добавляем id фильмов на кнопки для реализации My Library
  refs.addToWatchedBtn.dataset.id = obj.id;
  refs.addToQueueBtn.dataset.id = obj.id;
  genresSep(obj);
}

function genresSep(object) {
  let smarray;
  const genresArray = object.genres;
  genresArray.map(({ name }) => (refs.genre.textContent += `${name} `));
}

export default updateModalValue;
