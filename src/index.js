import './sass/main.scss';
import './js/openLibrary.js';
import refs from './js/refs.js';
import homeTrending from './js/apiPopularFetch.js';
import gridTemplate from './templates/movie-grid.hbs';
import lightbox from './js/modalFilmMarkup';
import './js/pagination.min';
import spinner from './templates/spinner.hbs';
// homeTrending.fetchPopular().then(results => {
//   const newResults = results.map(result => {
//     result.release_date = result.release_date.slice(0, 4);
//     result.poster_path =
//       'https://image.tmdb.org/t/p/original/' + result.poster_path;
//     return result;
//   });
//     refs.movieGrid.insertAdjacentHTML('beforeend', gridTemplate(newResults));
//     console.log("refs.movieGrid")
//     lightbox()
// });

// -------------данный объект репрезентация объекта в пагинаторе, для понимания работы и логики
const pagination = {
  // pageNumber, //	number	The selected page number
  pageRange: 5, //	number	Visible page number range
  pageSize: pageSizeCalc(window.innerWidth), //	number	Entries of per page
  // totalPage, //	number	Total page
  // totalNumber, //number	Total entries
  // el, //  jQuery object	Pagination element
  // direction, //number	Pagination direction, -1 means forward, 1 means backward, 0 means current is at initialization.
};
//-------------------------

homeTrending
  .fetchGenres()
  .then(data => data)
  .then(genresData => {
    // console.log(genresData);
    homeTrending.fetchPopular().then(results => {
      const newResults = results.map(result => {
        result.release_date = result.release_date.slice(0, 4);
        result.poster_path =
          'https://image.tmdb.org/t/p/original/' + result.poster_path;
        result.genre_ids = genresFilter(genresData, result.genre_ids);
        return result;
      });
      // const dataArr = [];
      $('#pagination-container').pagination({
        dataSource:
          //   function (done) {
          //   $.ajax({
          //     type: 'GET',
          //     url: `https://api.themoviedb.org/3/trending/movie/day?api_key=2d2272085b6a086155bacb1413ae9080`,
          //     success: function (response) {
          //       done(results);
          //     },
          //   });
          // },
          'https://api.themoviedb.org/3/trending/movie/day?api_key=2d2272085b6a086155bacb1413ae9080', // стек данных для пагинации, может быть функция возвращающая массив объектов, куча возможностей
        // локатор это ключ который есть в response и данные которого мы передаем в data
        locator: 'results',
        // общее количество страниц, почеммуто ломает pageSize
        // totalNumber: 1000,
        totalNumberLocator: function (response) {
          // you can return totalNumber by analyzing response content
          // console.log(response.total_pages);
          return response.total_pages;
        },
        pageSize: pageSizeCalc(window.innerWidth), // количество объектов-элементов на страницу
        pageRange: 1,
        //форматирование результатов данных из джсона
        formatResult: function (data) {
          for (var i = 0, len = data.length; i < len; i++) {
            data[i].release_date = data[i].release_date.slice(0, 4);
            // console.log(data[i].poster_path);
            data[i].poster_path =
              'https://image.tmdb.org/t/p/original' + data[i].poster_path;
          }
          // console.log(this.pageSize);
        },
        // то что отображается прежде чем вернется ответ от сервера - спинер совать сюда
        ajax: {
          beforeSend: function () {
            $('#js-grid').html(spinner());
          },
        },
        showPrevious: true, // показать стрелочку предыдущее
        showNext: true, //показать стрелочку следующее
        autoHidePrevious: true, // авто спрятать кнопку предыдущее
        autoHideNext: true, //авто спрятать кнопку следующее
        // showGoInput: true, //показать Гоинпут для ввода страницы
        // showGoButton: true, // показать кнопку Го для перехода к введенной в инпуте странице
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
          //--------------------------------------------
          const html = gridTemplate(data);
          $('#js-grid').html(html);
        },
        //псевдоним заменяющий имя пагинатора pageNumber на имя в API запросе в нашем случае page что позволяет повторно отсялать запросы при нажатии на страницу
        alias: {
          pageNumber: 'page',
          pageSize: 'limit',
        },
      });

      // refs.movieGrid.insertAdjacentHTML('beforeend', gridTemplate(newResults));
      //   console.log(newResults);
      lightbox();
    });
  });

// function getGenreNames(data,genreIds) {
//   return genresFilter(data, genreIds));
// }
function setGenresString(genresArray) {
  const reqGenres = [];
  genresArray.map(res => reqGenres.push(` ${res.name}`));
  // console.log(reqGenres.toString().trim());
  return reqGenres;
}
function genresFilter(data, genreIds) {
  const filtredData = data.filter(genre =>
    genreIds.find(genreId => genre.id === genreId),
  );
  // console.log(filtredData);
  return setGenresString(filtredData);
}
// возвращает размер страницы в зависимости от вьюпорта пользователя
function pageSizeCalc(innerWidth) {
  if (innerWidth < 768) {
    return 4;
  }
  if (innerWidth < 1024) {
    return 8;
  }
  return 9;
}
