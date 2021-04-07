const refs = {
  watchedBtn: document.getElementById('watched-btn-js'),
  queueBtn: document.getElementById('queue-btn-js'),
  alertMessage: document.querySelector('.alert-mesage'),
  libraryGallery: document.getElementById('js-library-gallery'),
  //   libraryContainer: document.getElementById('js-library-container'),
};
import movieGallaryCardTmpl from '../tamplates/library-gallery-card.hbs';
import fetchOneFilm from './findOneFilm';
 
// якщо відкриваємо лібрарі, то watched активна,
refs.watchedBtn.classList.add('btn-active');
const watchedStr = localStorage.getItem('Watched');
showWatchedMovies();
 
refs.watchedBtn.addEventListener('click', e => {
  e.preventDefault();
 
  refs.queueBtn.classList.remove('btn-active');
  refs.watchedBtn.classList.add('btn-active');
 
  showWatchedMovies();
});
 
// якщо клацаємо на queue, то стає активною вона
const queueStr = localStorage.getItem('Queue');
 
refs.queueBtn.addEventListener('click', e => {
  e.preventDefault();
//  refs.libraryGallery.innerHTML = '';
  refs.watchedBtn.classList.remove('btn-active');
  refs.queueBtn.classList.add('btn-active');
 
  showQueueMovies();
});
   
console.log(fetchOneFilm(movie_id));

function showWatchedMovies() {
  // якщо localStorage пустий, то показуємо повідомлення
  if (watchedStr === null || watchedStr === undefined) {
    refs.alertMessage.innerHTML = '';
    alertMessage();
  }
  // по ключу показуємо фільми (watchedStr = '[{id: 1, src: ""}]';)
  if (watchedStr) {
    //вставити фільми у шаблон
    try {
      const dataLocalWatch = JSON.parse(watchedStr);
      
// let movie_id = 645856;
// const renderOneFilm = fetchOneFilm(movie_id).then(PromiseResult => {
//   console.log(movieGallaryCardTmpl(PromiseResult));
// })
      
      // const galleryLibraryMarkup = dataLocalWatch.reduce(
      //   (acc, movieId) => {
      //       const renderOneFilm = fetchOneFilm(movieId).then(PromiseResult => {
      //         return movieGallaryCardTmpl(PromiseResult);
      //       })
      //     return acc + renderOneFilm
      //   }, '',
      // );

      const galleryLibraryMarkup = async () => {
        const filmSome = await fetchOneFilm(movieId);
        const film = filmSome.map(id => movieGallaryCardTmpl(id));
        const films = await Promise.all(film);
        return films
      }

      // const galleryLibraryMarkup = movieGallaryCardTmpl(dataLocalWatch);
      refs.libraryGallery.innerHTML = galleryLibraryMarkup;
    } catch (error) {
      console.log('Set state error: ', error);
    }
  }
}
 
function showQueueMovies() {
  if (queueStr === null) {
    refs.alertMessage.innerHTML = '';
    alertMessage();
  }
  if (queueStr) {
    //вставити фільми у шаблон
    try {
      const dataLocalqueue = JSON.parse(queueStr); // ''потрібні чи ні
      console.log(dataLocalqueue);
 
      //було так
      // const createGalleryItem = ({ preview, original, description }) =>
      //   `<li class="gallery__item"><a class="gallery__link" href='${original}' >
      // <img class="gallery__image" src='${preview}' data-source='${original}'
      // alt = '${description}' /></a ></li >`;
      // взяти з хбс
      const galleryLibraryMarkup = dataLocalqueue.reduce(
        (acc, item) => acc + movieGallaryCardTmpl(item),
      // де createGalleryItem шаблон строки лі
        '',
      );
 
      refs.libraryGallery.innerHTML = galleryLibraryMarkup;
    } catch (error) {
      console.log('Set state error: ', error);
    }
  }
}
 
function alertMessage() {
  const messageSorry = document.createElement('p');
  messageSorry.classList.add('library-message');
  messageSorry.textContent = 'Sorry, there are no movies';
  refs.alertMessage.appendChild(messageSorry);
}
 