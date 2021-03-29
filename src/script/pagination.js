import { refs } from './settings';
import pagination from 'pagination';

const paginator = pagination.create('search', {
  prelink: '/',
  current: 1,
  rowsPerPage: 200,
  totalResult: 10020,
});

const paginationMarkup = paginator.render();
refs.paginationContainer.innerHTML = paginationMarkup;
