const refs = {
  watchedBtn: document.getElementById('watched-btn-js'),
  queueBtn: document.getElementById('queue-btn-js'),
  alertMessage: document.querySelector('.alert-mesage'),
  libraryGallery: document.getElementById('js-library-gallery'),
  //   libraryContainer: document.getElementById('js-library-container'),
};

let watchedBtnActive = true;
// якщо відкриваємо лібрарі, то вотчед активна, якщо клацаємо на кьюіє, то стає активною вона
refs.watchedBtn.classList.add('controls-current');
const watchedStr = localStorage.getItem('watched');
showWatchedMovies();

refs.watchedBtn.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target.nodeName);

  showWatchedMovies();
});

function showWatchedMovies() {
  if (watchedStr === null) {
    refs.alertMessage.innerHTML = '';

    const messageSorry = document.createElement('p');
    messageSorry.classList.add('library-message');
    messageSorry.textContent = 'Soory, there are no movies';
    refs.alertMessage.appendChild(messageSorry);
  }
  if (watchedStr) {
    //вставити фільми у шаблон
    try {
      const dataLocalWatch = JSON.parse(watchedStr); // ''потрібні чи ні
      console.log(dataLocalWatch);

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
