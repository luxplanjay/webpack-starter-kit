import refs from './refs.js';

import { paginationParametersCommon } from './components/library';

import './pagination.min';

//
const container = $(refs.libraryPaginationContainer);

refs.buttonQueue.addEventListener('click', event => {
  refs.buttonWatched.classList.remove('library__button--active');
  refs.buttonQueue.classList.add('library__button--active');
});

refs.buttonWatched.addEventListener('click', event => {
  refs.buttonQueue.classList.remove('library__button--active');
  refs.buttonWatched.classList.add('library__button--active');
});

refs.navLibrary.addEventListener('click', openLibrary);

function openLibrary(event) {
  event.preventDefault();
  const watchedFilms = JSON.parse(localStorage.getItem('filmsWatched'));
  const queueFilms = JSON.parse(localStorage.getItem('filmsQueue'));

  refs.searchForm.classList.add('is-hidden');
  refs.homeGallery.classList.add('is-hidden');
  refs.buttons.classList.remove('is-hidden');
  refs.headerHomeOrMyLibrary.classList.add('lib');
  //слушатель кнопки очередь

  refs.buttonQueue.addEventListener('click', event => {
    console.log(event);
    console.log(cardsPerPage());
    container.pagination({
      ...paginationParametersCommon,
      dataSource: queueFilms,
      pageSize: cardsPerPage(),
    });
  });
  /*
   */
  // слушатель кнопки просмотренные

  refs.buttonWatched.addEventListener('click', event => {
    console.log(event);
    container.pagination({
      ...paginationParametersCommon,
      // ToDo: change "queueFilms" to "watchedFilms"
      dataSource: watchedFilms,
      pageSize: cardsPerPage(),
    });
  });

  // modified by Maryasov
  // refs.libraryList.textContent = '';
  container.pagination({
    ...paginationParametersCommon,
    dataSource: queueFilms,
    pageSize: cardsPerPage(),
  });

  refs.myLibraryGallery.classList.remove('is-hidden');
  refs.errorWarning.classList.add('is-hidden');
  refs.underscoreOnMyLibrary.classList.remove('is-hidden');
  refs.underscoreOnHome.classList.add('is-hidden');
}
function cardsPerPage() {
  const currentWidthMode = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--currentWidthMode');
  console.log(currentWidthMode);
  return currentWidthMode;
}
