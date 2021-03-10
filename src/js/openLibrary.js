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

  refs.searchForm.classList.add('is-hidden');
  refs.homeGallery.classList.add('is-hidden');
  refs.buttons.classList.remove('is-hidden');
  refs.headerHomeOrMyLibrary.classList.add('lib');
  //слушатель кнопки очередь

  refs.buttonQueue.addEventListener('click', event => {
//     console.log(event);
//     console.log(cardsPerPage());
    container.pagination({
      ...paginationParametersCommon,
      dataSource: JSON.parse(localStorage.getItem('filmsQueue')), //queueFilms,
      pageSize: cardsPerPage(),
  
    });
  });
  /*
   */
  // слушатель кнопки просмотренные

  refs.buttonWatched.addEventListener('click', event => {
    // console.log(event);
    // const watchedFilms = JSON.parse(localStorage.getItem('filmsWatched'));
    container.pagination({
      ...paginationParametersCommon,
      // ToDo: change "queueFilms" to "watchedFilms"
      dataSource: JSON.parse(localStorage.getItem('filmsWatched')), //watchedFilms,
      pageSize: cardsPerPage(),
    });
  });

  // modified by Maryasov
  // refs.libraryList.textContent = '';

  container.pagination({
    ...paginationParametersCommon,
    dataSource: JSON.parse(localStorage.getItem('filmsWatched')), //queueFilms,
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


  // function pageSizeCalc(innerWidth) {
  //   if (innerWidth < 768) {
  //     return 4;
  //   }
  //   if (innerWidth < 1024) {
  //     return 8;
  //   }
  //   return 9;
  // }
}

//Добавляем слушателя на кнопку Home

refs.navHome.addEventListener('click', openHome);
function openHome(event) {
  event.preventDefault(event);
  refs.searchForm.classList.remove('is-hidden');
  refs.homeGallery.classList.remove('is-hidden');
  refs.buttons.classList.add('is-hidden');
  refs.myLibraryGallery.classList.add('is-hidden');
  refs.underscoreOnMyLibrary.classList.add('is-hidden');
  refs.underscoreOnHome.classList.remove('is-hidden');
  refs.headerHomeOrMyLibrary.classList.remove('lib'); // refs.myHomeGallery.classList.remove('is-hidden'); //refs.errorWarning.classList.add('is-hidden');
}
