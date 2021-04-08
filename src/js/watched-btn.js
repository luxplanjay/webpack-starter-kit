import refs from './refs';
import movieGallaryCardTmpl from '../tamplates/library-gallery-card.hbs';
 
// якщо відкриваємо лібрарі, то watched активна,
refs.watchedBtn.classList.add('btn-active');
fetchMoviesFromLocalStorage();

let arrWatchedFilms;
let arrQueueFilms;

refs.watchedBtn.addEventListener('click', e => {
  e.preventDefault();
 
  refs.queueBtn.classList.remove('btn-active');
  refs.watchedBtn.classList.add('btn-active');
 
  arrWatchedFilms = getArrWatchedFilms();
  fetchMoviesFromLocalStorage();
});
 
// якщо клацаємо на queue, то стає активною вона
refs.queueBtn.addEventListener('click', e => {
  e.preventDefault();

  refs.watchedBtn.classList.remove('btn-active');
  refs.queueBtn.classList.add('btn-active');
 
  arrQueueFilms = getArrQueueFilms();
  fetchQueueMoviesFromLocalStorage();
});
   
function alertMessage() {
  const messageSorry = document.createElement('p');
  messageSorry.classList.add('library-message');
  messageSorry.textContent = 'Sorry, there are no movies';
  refs.alertMessage.appendChild(messageSorry);
}

function fetchMoviesForId(movie_id) {
  // шукає фильми по ID і добавляє розмітку в library
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=6df9a2b88a6cdc986e05b3daaeb09968`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
}
 
function fetchMoviesFromLocalStorage() {                               
    const arr = getArrWatchedFilms()
    refs.libraryGallery.innerHTML = '';
    if (arr.length === 0) {
      alertMessage()
    }
    arr.map(film => {
        fetchMoviesForId(film)
          .then(results => {
            const markup = movieGallaryCardTmpl(results);
            
            refs.libraryGallery.insertAdjacentHTML('beforeend', markup);
          });
    })
}

function fetchQueueMoviesFromLocalStorage() {                               
    const arr = getArrQueueFilms()
    refs.libraryGallery.innerHTML = '';
    if (arr.length === 0) {
      alertMessage()
    }
    arr.map(film => {
        fetchMoviesForId(film)
          .then(results => {
            const markup = movieGallaryCardTmpl(results);
            
            refs.libraryGallery.insertAdjacentHTML('beforeend', markup);
          });
    })
}

function getArrWatchedFilms() {                         
    if (localStorage.getItem('Watched')) {
        const arrString = localStorage.getItem('Watched');
        const arrPars = JSON.parse(arrString);
        return arrWatchedFilms = [...arrPars]
    }
    return []
}

function getArrQueueFilms() {                         
    if (localStorage.getItem('Queue')) {
        const arrString = localStorage.getItem('Queue');
        const arrPars = JSON.parse(arrString);
        return arrQueueFilms = [...arrPars]
    }
    return []
}