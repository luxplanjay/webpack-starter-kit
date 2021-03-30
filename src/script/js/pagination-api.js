import pagination from 'pagination';

export default class Pagination {
  constructor(currentPage, resultsAmount) {
    this.currentPage = currentPage;
    this.resultsAmount = resultsAmount;
    this.itemsPerPage = 20;
  }

  paginationMarkup() {
    const boostrapPaginator = new pagination.TemplatePaginator({
      current: this.currentPage,
      rowsPerPage: this.itemsPerPage,
      totalResult: this.resultsAmount,
      slashSeparator: true,
      template: function (result) {
        const vw = Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0,
        );
        let html = '<div><ul class="paginator">';
        if (result.pageCount < 2) {
          html += '</ul></div>';
          return html;
        }
        if (result.previous && result.current >= 4 && vw > 768) {
          html +=
            '<li class="page-item">' +
            1 +
            '</li>' +
            '<li class="page-item">' +
            '&middot&middot&middot' +
            '</li>';
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
        if (result.next && result.current <= result.last - 4 && vw > 768) {
          html +=
            '<li class="page-item">' +
            '&middot&middot&middot' +
            '</li>' +
            '<li class="page-item">' +
            result.last +
            '</li>';
        } else if (result.last && vw > 768) {
          html += '<li class="page-item">' + result.last + '</li>';
        }
        html += '</ul></div>';
        return html;
      },
    });
    return boostrapPaginator.render();
  }
}
