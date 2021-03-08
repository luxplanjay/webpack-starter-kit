import refs from './refs.js';
import optionsPagination from '../js/paginationOptions';
import { libraryMarkupBuilder } from './components/library';
// temporary data:
const testData = {
  results: [
    {
      poster_path: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', //https://image.tmdb.org/t/p/original
      title: 'Titanic',
      genre_ids: '18, 10749',
      release_date: '2010-08-07',
      vote_average: 7.9,
    },
    {
      poster_path: '/e9XRikkyth0GtG8RkU3XNm0oMsA.jpg',
      title: 'Titanic II',
      genre_ids: '28, 12, 53',
      release_date: '2010-08-07',
      vote_average: 4.6,
    },
    {
      poster_path: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      title: 'Titanic',
      genre_ids: '18, 10749',
      release_date: '2010-08-07',
      vote_average: 7.9,
    },
  ],
};
//
const container = $('#library__page-selector');
// modified by MAryasov--------
// temporary data:
const currentPageIDs = [793723, 527774, 9602, 580532];

const watchedItems = localStorage.getItem('filmsWatched');
const parsedWatchedItems = JSON.parse(watchedItems);

const watchedData = {
  results: parsedWatchedItems,
};
//----------
console.log(watchedData);

refs.navLibrary.addEventListener('click', openLibrary);

function openLibrary(event) {
  event.preventDefault();
  refs.searchForm.classList.add('is-hidden');
  refs.homeGallery.classList.add('is-hidden');
  refs.buttons.classList.remove('is-hidden');

  // modified by MAryasov
  // refs.libraryList.textContent = '';
  container.pagination({
    ...optionsPagination, //деструктуризация базовых настроек пагинатора (default options) рендер страницы зашит в дефолтных опциях!!!
    dataSource: watchedData, //передача корня ссылки на сайт в данном случае ссылка поиска
    pageSize: pageSizeCalc(window.innerWidth),
    callback: function (data, pagination) {
      // тут код с методами отрисовки макета страницы по шаблонам,
      //data это кусок массива объектов согласно номера страницы dataSource[..., data<N- elements of array >, ...]
      //------------------------------------------------
      // pagination.pageSize = pageSizeCalc(window.innerWidth);
      // console.log(pagination);
      // console.log(data);
      // homeTrending.page = Math.trunc(
      //   Number(pagination.pageNumber) /
      //     Math.trunc(20 / Number(pagination.pageSize)),
      // );
      // apiSearch.page = this.pageNumber;
      //--------------------------------------------
      const html = libraryMarkupBuilder(data);
      $('#my-library').html(html);
    },
    // ajax: apiService.ajaxDataForSearch, // настройки запросов аякса под каждый сайт-сервер (apiKey,page,query)
  });
  // refs.myLibraryGallery.insertAdjacentHTML(
  //   'afterbegin',
  //   libraryMarkup(testData).trim(),
  // );

  // modified by Maryasov
  // refs.libraryList.textContent = '';
  // libraryMarkupBuilder(currentPageIDs);

  refs.myLibraryGallery.classList.remove('is-hidden');
  refs.errorWarning.classList.add('is-hidden');
  refs.underscoreOnMyLibrary.classList.remove('is-hidden');
  refs.underscoreOnHome.classList.add('is-hidden');
}
function pageSizeCalc(innerWidth) {
  if (innerWidth < 768) {
    return 4;
  }
  if (innerWidth < 1024) {
    return 8;
  }
  return 9;
}
