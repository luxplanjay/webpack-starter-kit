import paginationList from '../templates/pagination.hbs';
import apiService from './apiService.js';
import refs from './refs';
let numberOfPagesPagination;
let totalPages;

function createArrayPaginationMobile(numberOfPages, activePage, totalPages) {
  let arrayOfPages;
  const centerOfPages = Math.ceil(numberOfPages / 2);
  if (numberOfPages >= totalPages || activePage <= centerOfPages) {
    arrayOfPages = Array.from({ length: numberOfPages }, (v, k) => {
      return k + 1;
    });
  } else {
    arrayOfPages = Array.from(
      { length: numberOfPages },
      (v, k) => activePage - centerOfPages + k + 1,
    );
  }

  return arrayOfPages.map(elem =>
    elem === activePage ? { elem, isActive: true } : { elem, isActive: false },
  );
}
function createArrayPagination(numberOfPages, activePage, totalPages) {
  let arrayOfPages;
  const centerOfPages = Math.ceil(numberOfPages / 2);
  if (numberOfPages >= totalPages) {
    arrayOfPages = Array.from({ length: numberOfPages }, (v, k) => {
      return k + 1;
    });
  } else if (activePage <= centerOfPages) {
    arrayOfPages = [
      ...Array.from({ length: 7 }, (v, k) => {
        return k + 1;
      }),
      '...',
      totalPages,
    ];
  } else if (activePage === totalPages) {
    arrayOfPages = [
      1,
      '...',
      ...Array.from({ length: 7 }, (v, k) => {
        return activePage - numberOfPages + 3 + k;
      }),
    ];
  } else {
    arrayOfPages = [
      1,
      '...',
      ...Array.from({ length: 5 }, (v, k) => {
        return activePage - centerOfPages + k + 3;
      }),
      '...',
      totalPages,
    ];
  }

  return arrayOfPages.map(elem =>
    elem === activePage ? { elem, isActive: true } : { elem, isActive: false },
  );
}

export default {
  addPaginationList({ totalHits }, activePage) {
    totalPages = Math.ceil(totalHits / apiService.perPages);
    if (!totalHits) return;
    let arrayPagination;
    // debugger;

    if (totalPages <= 5) {
      numberOfPagesPagination = totalPages;
    } else {
      if (document.body.clientWidth < 768) {
        numberOfPagesPagination = 5;
      } else {
        numberOfPagesPagination = 9;
      }
    }
    if (document.body.clientWidth < 768) {
      arrayPagination = createArrayPaginationMobile(
        totalPages <= 5 ? totalPages : numberOfPagesPagination,
        activePage,
        totalPages,
      );
    } else {
      arrayPagination = createArrayPagination(
        totalPages <= 9 ? totalPages : numberOfPagesPagination,
        activePage,
        totalPages,
      );
    }

    refs.paginationBox.classList.remove('is-hidden');
    refs.paginationList.innerHTML = '';
    refs.paginationList.insertAdjacentHTML(
      'beforeend',
      paginationList(arrayPagination),
    );
  },

  getPageForFetch(eventTarget) {
    let activePage = +refs.paginationBox.querySelector('.active').textContent;
    if (eventTarget.classList.contains('prev')) {
      return activePage > 1 ? activePage - 1 : 1;
    }
    if (eventTarget.classList.contains('next')) {
      return activePage < totalPages ? activePage + 1 : totalPages;
    }
    return +eventTarget.textContent;
  },
};
