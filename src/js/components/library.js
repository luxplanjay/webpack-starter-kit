// import external modules here:

// import Refs here:
import refs from '../refs.js';
// import templates:
import libraryTemplate from '../../templates/library.hbs';
import libraryCardTemplate from '../../templates/library__card.hbs';

export const paginationParametersCommon = {
  locator: 'results',
  totalNumberLocator: 2,
  pageSize: 4,
  pageRange: 2,
  formatResult: function (data) {
    // console.log(data);
    return data.map(obj => {
      if (obj.release_date) {
        obj.release_date = obj.release_date.slice(0, 4);
      } else {
        obj.release_date = 'unknown';
      }
      obj.poster_path = 'https://image.tmdb.org/t/p/w342' + obj.poster_path;

      obj.genres = obj.genres
        .map(obj => obj.name)
        .map((genre, index, array) => {
          if (index === 2) return 'Other';
          return genre;
        })
        .slice(0, 2)
        .toString();

      return obj;
    });
  },
  showPrevious: true, // показать стрелочку "предыдущее"
  prevText: '',
  showNext: true, //показать стрелочку "следующее"
  nextText: '',
  autoHidePrevious: false, // авто спрятать кнопку "предыдущее"
  autoHideNext: false, // авто спрятать кнопку "следующее"
  beforePaging: function (arg) {
    // console.log(arg);obj.genres
    // apiService.page = arg;
  },
  callback: function (data) {
    // apiSearch.page = this.pageNumber;
    //--------------------------------------------
    const html = libraryTemplate(data);
    $(refs.libraryList).html(html);
  },
  //псевдоним заменяющий имя пагинатора pageNumber на имя в API запросе в нашем случае page что позволяет повторно отсялать запросы при нажатии на страницу
  alias: {
    pageNumber: 'page',
    // pageSize: 'limit',
  },
  dataSource: "",
};

