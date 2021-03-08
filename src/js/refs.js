const refs = {
  headerRef: document.querySelector('.header'),
  paginationBox: document.querySelector('.pagination'),
  paginationList: document.querySelector('.pagination__list'),
  filmListRef: document.querySelector('.films__list'),
  checkboxEl: document.querySelector('#theme-switch-toggle'),
  bodyEl: document.querySelector('body'),
  modalRef: document.querySelector('.modal'),
  backdropModalRef: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('[data-action=close]'),

  modalImg: document.querySelector('.modal__image'),
  modalTitle: document.querySelector('.modal__title'),
  votes: document.querySelector('[data-attribute="votes"]'),
  rate: document.querySelector('.film-info__rate'),
  popularity: document.querySelector('[data-attribute="popularity"]'),
  title: document.querySelector('[data-attribute="title"]'),
  genre: document.querySelector('[data-attribute="genre"]'),
  descr: document.querySelector('.description-text'),

  addToWatchedBtn: document.querySelector('.modal__btn--watched'),
  addToQueueBtn: document.querySelector('.modal__btn--queue'),

  watchedBtnLibrary: document.querySelector('.header'),
};

export default refs;
