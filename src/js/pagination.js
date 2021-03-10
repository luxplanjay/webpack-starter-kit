import Pagination from 'tui-pagination';
// import { showMoviesInTrend } from './fetchAPIandMovieList/moviesListEventsHandler';
// import { searchMovies } from './fetchAPIandMovieList/moviesListEventsHandler';
import fetchAPI from '../js/fetchAPIandMovieList/fetchAPI';
//import 'tui-pagination/dist/tui-pagination.css';

export default function renderPagination(totalItems) {
  //console.log(totalItems);
  const pagination = new Pagination('pagination', {
    totalItems,
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
    },
  });
  pagination.on('afterMove', function (eventData) {
    console.log('poisk ili net', fetchAPI.moviesSearchActive);
    if (fetchAPI.moviesSearchActive === false) {
      fetchAPI.showMoviesInTrend(eventData.page);
    } else if (fetchAPI.moviesSearchActive === true) {
      fetchAPI.searchMovies(eventData.page);
    }
  });
}