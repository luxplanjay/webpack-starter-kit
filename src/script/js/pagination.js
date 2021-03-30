
import Pagination from './pagination-api'


const pagination = new Pagination(28, 1000);

const paginationWrapperRef = document.querySelector('.js-pagination-wrapper');


paginationWrapperRef.innerHTML = pagination.paginationMarkup();
