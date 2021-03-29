import pagination from 'pagination';

const paginationWrapperRef = document.querySelector('.js-pagination-wrapper');

let itemPerPage = 4;

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0,
);

const setNumberOfItems = () => {
  if (vw > 768) itemPerPage = 8;
  if (vw > 1024) itemPerPage = 9;
  return itemPerPage;
};
setNumberOfItems();

const boostrapPaginator = new pagination.TemplatePaginator({
  current: 15,
  rowsPerPage: 200,
  totalResult: 10020,
  slashSeparator: true,
  template: function (result) {
    let html = '<div><ul class="paginator">';
    if (result.pageCount < 2) {
      html += '</ul></div>';
      return html;
    }
    if (result.previous) {
      html += '<li class="page-item">' + '&middot&middot&middot' + '</li>';
    }
    if (result.range.length) {
      result.range.forEach((item, index) => {
        if (result.range[index] === result.current) {
          html +=
            '<li class="active page-item">' + result.range[index] + '</li>';
        } else {
          html += '<li class="page-item">' + result.range[index] + '</li>';
        }
      });
    }
    if (result.next) {
      html += '<li class="page-item">' + '&middot&middot&middot' + '</li>';
    }
    html += '</ul></div>';
    return html;
  },
});

const paginationMarkup = boostrapPaginator.render();

paginationWrapperRef.innerHTML = paginationMarkup;
