import refs from './refs';
import Pagination from './pagination-api';

const pagination = new Pagination(28, 1000);

refs.paginationWrapper.innerHTML = pagination.paginationMarkup();
