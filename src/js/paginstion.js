import Pagination from 'tui-pagination';
import movieGalleryCardTpl from '../tamplates/movie-gallery-card.hbs';
import refs from './refs.js';
import NewGetMovie from './NewGetMovie.js';
import spinner from './spinner.js';

const getNewPage = new NewGetMovie();

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 400,
  itemsPerPage: 20,
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

pagination.on('afterMove', function (evt) {
  getNewPage.setPage(evt.page);
  toCreateGallery();
});

function toCreateGallery() {
  spinner.spin(refs.loadSpinner);

  getNewPage
    .toCreateDataList()
    .then(results => {
      const markup = movieGalleryCardTpl(results);
      refs.gallery.innerHTML = markup;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      spinner.stop();
    });
}
