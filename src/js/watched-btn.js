const refs = {
  watchedBtn: document.getElementById('watched-btn-js'),
  queueBtn: document.getElementById('queue-btn-js'),
  alertMessage: document.querySelector('.alert-mesage'),
  libraryGallery: document.getElementById('js-library-gallery'),
  //   libraryContainer: document.getElementById('js-library-container'),
};
import movieGallaryCardTmpl from '../tamplates/movie-gallery-card.hbs';
 
// якщо відкриваємо лібрарі, то watched активна,
refs.watchedBtn.classList.add('btn-active');
const watchedStr = localStorage.getItem('watched');
showWatchedMovies();
 
refs.watchedBtn.addEventListener('click', e => {
  e.preventDefault();
 
  refs.queueBtn.classList.remove('btn-active');
  refs.watchedBtn.classList.add('btn-active');
 
  showWatchedMovies();
});
 
// якщо клацаємо на queue, то стає активною вона
const queueStr = localStorage.getItem('queue');
 
refs.queueBtn.addEventListener('click', e => {
  e.preventDefault();
 
  refs.watchedBtn.classList.remove('btn-active');
  refs.queueBtn.classList.add('btn-active');
 
  showQueueMovies();
});
 
function showWatchedMovies() {
  // якщо localStorage пустий, то показуємо повідомлення
  if (watchedStr === null) {
    refs.alertMessage.innerHTML = '';
    alertMessage();
  }
  // по ключу показуємо фільми (watchedStr = '[{id: 1, src: ""}]';)
  if (watchedStr) {
    //вставити фільми у шаблон
    try {
      const dataLocalWatch = JSON.parse(watchedStr); // ''потрібні чи ні
      console.log(dataLocalWatch);
      // варіант 1
      // const createGalleryItem = ({ { id, poster_path, title,
                        // release_date, genre_ids,
                        // vote_average, vote_count, original_title,
                        // genres, overview, popularity } }) =>
      //   (`<li class="gallery__item"><a class="gallery__link" href='${original}' >
      // <img class="gallery__image" src='${preview}' data-source='${original}'
      // alt = '${description}' /></a ></li >`;) - замість цього темплейт
      // взяти з хбс шаблон
      //const movieTmptwithDestr = movieGallaryCardTmpl(createGalleryItem);
      // варіант 2
      // const galleryLibraryMarkup = dataLocalWatch.reduce(
      //   (acc, item) => acc + createGalleryItem(item), 
      // чи // (acc, item) => acc + movieGallaryCardTmpl(item),
      // де createGalleryItem шаблон строки лі
      //   '',
      // );
      // варіант 3
      // const galleryLibraryMarkup = movieGallaryCardTmpl(dataLocalWatch);
      // refs.libraryGallery.insertAdjacentHTML("beforeend", galleryLibraryMarkup);
    } catch (error) {
      console.log.error('Set state error: ', error);
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
      // const galleryLibraryMarkup = dataLocalWatch.reduce(
      //   (acc, item) => acc + createGalleryItem(item),
      // де createGalleryItem шаблон строки лі
      //   '',
      // );
 
      // refs.libraryGallery.insertAdjacentHTML("afterbegin", galleryLibraryMarkup);
    } catch (error) {
      console.log.error('Set state error: ', error);
    }
  }
}
 
function alertMessage() {
  const messageSorry = document.createElement('p');
  messageSorry.classList.add('library-message');
  messageSorry.textContent = 'Sorry, there are no movies';
  refs.alertMessage.appendChild(messageSorry);
}
 