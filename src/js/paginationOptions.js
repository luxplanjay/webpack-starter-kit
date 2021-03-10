import apiSearch from './apiSearchFetch';
import gridTemplate from '../templates/movie-grid.hbs';
import refs from './refs.js';
import getCardData from './cardDataHandler.js';
import './components/pnotifyInclude.js';
import { notice, error } from '@pnotify/core/dist/PNotify.js';

export default {
  dataSource: '', // стек данных для пагинации, может быть функция возвращающая массив объектов, куча возможностей

  //   function (done) {
  //   $.ajax({
  //     type: 'GET',
  //     url: `https://api.themoviedb.org/3/search/movie?query=${apiService.query}&page=${apiService.page}`,
  //     success: function (response) {
  //       done(response.results);
  //     },
  //   });
  // },
  // локатор это ключ который есть в response и данные которого мы передаем в data
  locator: 'results',
  // общее количество страниц, почеммуто ломает pageSize
  // totalNumber: 7,
  totalNumberLocator: function (response) {
    if (response.total_pages === 0) {
      error({
        text:
          'Search result not successful. Enter the correct movie name and try again!',
      });
    }
    return response.total_pages;
  },
  pageSize: 1, //pageSizeCalc(window.innerWidth), // количество объектов-элементов на страницу
  pageRange: 2,
  //форматирование результатов данных из джсона
  formatResult: function (data) {
    getCardData(data);
  },
  // то что отображается прежде чем вернется ответ от сервера - спинер совать сюда
  //   ajax: {
  //     data: {
  //       api_key: '2d2272085b6a086155bacb1413ae9080',
  //       query: apiSearch.query,
  //       page: apiSearch.page,
  //     },
  //     beforeSend: function () {
  //       $('#js-grid').html(spinner());
  //     },
  //   },
  showPrevious: true, // показать стрелочку предыдущее
  showNext: true, //показать стрелочку следующее
  autoHidePrevious: true, // авто спрятать кнопку предыдущее
  autoHideNext: true, //авто спрятать кнопку следующее
  // showGoInput: true, //показать Гоинпут для ввода страницы
  // showGoButton: true, // показать кнопку Го для перехода к введенной в инпуте странице
  beforePaging: function (arg) {
    // apiService.page = arg;
  },
  // beforeNextOnClick: function () {
  //   apiService.page += 1;
  // },
  // beforePreviousOnClick: function () {
  //   apiService.page -= 1;
  // },
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
    apiSearch.page = this.pageNumber;
    //--------------------------------------------
    const html = gridTemplate(data);
    $('#js-grid').html(html);
  },
  //псевдоним заменяющий имя пагинатора pageNumber на имя в API запросе в нашем случае page что позволяет повторно отсялать запросы при нажатии на страницу
  alias: {
    pageNumber: 'page',
    // pageSize: 'limit',
  },
};
// -------------данный объект репрезентация объекта в пагинаторе, для понимания работы и логики
// const pagination = {
//   // pageNumber, //	number	The selected page number
//   pageRange: 5, //	number	Visible page number range
//   pageSize: pageSizeCalc(window.innerWidth), //	number	Entries of per page
//   // totalPage, //	number	Total page
//   // totalNumber, //number	Total entries
//   // el, //  jQuery object	Pagination element
//   // direction, //number	Pagination direction, -1 means forward, 1 means backward, 0 means current is at initialization.
// };
//-------------------------
// возвращает размер страницы в зависимости от вьюпорта пользователя не работает для данного нам API
// function pageSizeCalc(innerWidth) {
//   if (innerWidth < 768) {
//     return 4;
//   }
//   if (innerWidth < 1024) {
//     return 8;
//   }
//   return 9;
// }
