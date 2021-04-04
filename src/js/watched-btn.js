const refs = {
  watchedBtn: document.getElementById('watched-btn-js'),
  queueBtn: document.getElementById('queue-btn-js'),
  alertMessage: document.querySelector('.alert-mesage'),
  libraryGallery: document.getElementById('js-library-gallery'),
  //   libraryContainer: document.getElementById('js-library-container'),
};

// якщо відкриваємо лібрарі, то watched активна, якщо клацаємо на queue, то стає активною вона
refs.watchedBtn.classList.add('btn-active');
const watchedStr = localStorage.getItem('watched');
showWatchedMovies();

refs.watchedBtn.addEventListener('click', e => {
  e.preventDefault();

  refs.queueBtn.classList.remove('btn-active');
  refs.watchedBtn.classList.add('btn-active');

  showWatchedMovies();
});

refs.queueBtn.addEventListener('click', e => {
  e.preventDefault();

  refs.watchedBtn.classList.remove('btn-active');
  refs.queueBtn.classList.add('btn-active');

  showQueueMovies();
});

function showWatchedMovies() {
  if (watchedStr === null) {
    refs.alertMessage.innerHTML = '';
    alertMessage();
  }
  // watchedStr = '[{id: 1, src: ""}]';
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

const queueStr = localStorage.getItem('queue');

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
  messageSorry.textContent = 'Soory, there are no movies';
  refs.alertMessage.appendChild(messageSorry);
}
