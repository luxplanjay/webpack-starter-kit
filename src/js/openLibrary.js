import refs from './refs.js';

import { paginationParametersCommon } from './components/library';

import './pagination.min';

//
const container = $(refs.libraryPaginationContainer);

// refs.buttonQueue.addEventListener('click',);

function buttonQueueActive() {
  refs.buttonWatched.classList.remove('library__button--active');
  refs.buttonQueue.classList.add('library__button--active');
}

// refs.buttonWatched.addEventListener('click');
function buttonWatchedActive() {
  refs.buttonQueue.classList.remove('library__button--active');
  refs.buttonWatched.classList.add('library__button--active');
}

// refs.navLibrary.addEventListener('click', openLibrary);
function queuePaginate() {
  paginatingLib(container, (JSON.parse(localStorage.getItem('filmsQueue'))), (cardsPerPage()));
}

function watchedPaginate() {
  paginatingLib(container, (JSON.parse(localStorage.getItem('filmsWatched'))), (cardsPerPage()));
}

function openLibrary(event) {
  event.preventDefault();

  refs.searchForm.classList.add('is-hidden');
  refs.homeGallery.classList.add('is-hidden');
  refs.buttons.classList.remove('is-hidden');
  refs.headerHomeOrMyLibrary.classList.add('lib');
  //слушатель кнопки очередь

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



// refs.navHome.addEventListener('click', openHome);
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

// refactoring event listeners
refs.header.addEventListener('click', event => {
  // Обработка на кнопки Library
  if (event.target.id === 'library') {
    openLibrary(event);
    watchedPaginate();
    return;
  }
  //Обработка на кнопки Home
  if (event.target.id === 'home') {
    openHome(event);
    return;
  }
  if (event.target.id === 'watched') {
    if (!event.target.classList.contains('library__button--active')) {
      buttonWatchedActive();
      watchedPaginate();
    }
    return;
  }
  if (event.target.id === 'queue') {
    // console.log(event.target.classList.contains('library__button--active'));
    if (!event.target.classList.contains('library__button--active')) {
      buttonQueueActive();
      queuePaginate(event);
    }
    return;
  }
});


function paginatingLib(containerToUse, SourceToUse, cardsPerPage){
  
  containerToUse.pagination({
    ...paginationParametersCommon,
    dataSource: SourceToUse,
    pageSize: cardsPerPage,
    showPrevious: ((SourceToUse.length/cardsPerPage)>2),
    showNext: ((SourceToUse.length/cardsPerPage>2))
  });
}