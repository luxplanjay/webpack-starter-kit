import refs from './refs';
import movieGallaryCardTmpl from '../tamplates/library-gallery-card.hbs';
 
// якщо відкриваємо лібрарі, то watched активна,
refs.watchedBtn.classList.add('btn-active');
// const watchedStr = localStorage.getItem('Watched');
fetchMoviesFromLocalStorage();

let arrWatchedFilms;

function fetchMoviesForId(movie_id) {
  // шукає фильми по ID і добавляє розмітку в library
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=6df9a2b88a6cdc986e05b3daaeb09968`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
}
 
refs.watchedBtn.addEventListener('click', e => {
  e.preventDefault();
 
  refs.queueBtn.classList.remove('btn-active');
  refs.watchedBtn.classList.add('btn-active');
 
  arrWatchedFilms = getArrWatchedFilms();
  fetchMoviesFromLocalStorage();
});
 
// якщо клацаємо на queue, то стає активною вона
// видалити коли Настя пропише у себе
 
refs.queueBtn.addEventListener('click', e => {
  e.preventDefault();
  refs.watchedBtn.classList.remove('btn-active');
  refs.queueBtn.classList.add('btn-active');
 
  // показуємо фільми
});
   
function alertMessage() {
  const messageSorry = document.createElement('p');
  messageSorry.classList.add('library-message');
  messageSorry.textContent = 'Sorry, there are no movies';
  refs.alertMessage.appendChild(messageSorry);
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

function getArrWatchedFilms() {                         
    if (localStorage.getItem('Watched')) {
        const arrString = localStorage.getItem('Watched');
        const arrPars = JSON.parse(arrString);
        return arrWatchedFilms = [...arrPars]
    }
    return []
}