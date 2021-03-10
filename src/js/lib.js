import fetchApi from './fetchAPIandMovieList/fetchAPI';
import localStorageUtil from './localStorage';
import renderMovies from './fetchAPIandMovieList/renderMovies';
import temp from '../template/moviesListTemplate.hbs';
import Pagination from 'tui-pagination';
import refs from './refs'

const buttonQueue = document.querySelector('.button-queque');
const buttonWatched = document.querySelector('.button-watched');

const moviesContainerRef = document.querySelector('.movies-container-js');
const myLibraryButton = document.querySelector('.lib-link');
myLibraryButton.addEventListener('click', () =>  renderLibraryFilms('watched') );
buttonWatched.addEventListener('click', () =>  renderLibraryFilms('watched') );
buttonQueue.addEventListener('click', () => renderLibraryFilms('queue') );

function renderLibraryFilms(key) {
  let libraryFilms = localStorageUtil.getFilms(key);
  let arrayFilms = [];

  if (libraryFilms.length === 0) {
    refs.pagination.innerHTML = ''
  }

  if (key === "watched") {
    buttonQueue.classList.remove('active');
    buttonWatched.classList.add('active');
  } else {
    buttonQueue.classList.add('active');
    buttonWatched.classList.remove('active');
  }

  moviesContainerRef.innerHTML = '<p>Movie list is empty</p>';

    libraryFilms.map(id => {
    const promId = fetchApi.getFullMovieInfo(id);
    promId.then(fullInfo => {
      arrayFilms.push(fullInfo);

      renderPagLibrary(arrayFilms, key)
      renderMovies(filmPerCurrentPage(arrayFilms, 1), moviesContainerRef, temp);
      });
    });
}

console.log(filmToCurrentPage)

function renderPagLibrary(totalItems, key) {
  const pag = new Pagination('pagination', {
    totalItems: totalItems.length,
    itemsPerPage: 20,
    visiblePages: 5,
    template: {
      page: '<a href="#" class="tui-page-btn btn-page1 btn">{{page}}</a>',
      currentPage:
        '<a href="#" class="tui-page-btn btn-page1 active btn">{{page}}</a>',
      moveButton: '<a href ="#" class=" {{type}} custom-class-{{type}}"></a>',
      disabledMoveButton:
        '<a href ="#" class="{{type}} custom-class-{{type}}"></a>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    }
  })
  pag.on('afterMove', function (eventData) {
    console.log(eventData.page)
    let libraryFilms = localStorageUtil.getFilms(key);
    let arrayFilms = [];
    libraryFilms.map(id => {
    const promId = fetchApi.getFullMovieInfo(id);
    promId.then(fullInfo => {
      arrayFilms.push(fullInfo);
      

      renderMovies(filmPerCurrentPage(arrayFilms, eventData.page), moviesContainerRef, temp);
      
      });
    })
  })
}

function filmPerCurrentPage(arr, page) {
  let newArr = []
  for (let i = (page - 1) * 20; i < page * 20; i++) {
    if (arr[i] != undefined) {
      newArr.push(arr[i])
    } else return newArr
  }
  return newArr
}
