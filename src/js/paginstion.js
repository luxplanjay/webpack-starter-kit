import Pagination from 'tui-pagination';

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
  template: {
    page: "<button id='page' class='tui-page-btn page-btn'>{{page}}</button>",
    currentPage:
      '<button id="page" class="tui-page-btn tui-is-selected active-page-btn">{{page}}</button>',
    moveButton:
      '<button id="page" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</button>',
    moreButton:
      '<button id="page" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</button>',
    disabledMoveButton:
      '<button id="page" class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<button  class="tui-ico-{{type}}">{{type}}</button>' +
      '</button>',
  },
});
