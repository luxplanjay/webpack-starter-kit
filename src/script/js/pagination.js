import refs from './refs';
import Pagination from './pagination-api';

const pagination = new Pagination();

refs.paginationWrapper.innerHTML = pagination.renderPaginationMarkup(28, 1000);
