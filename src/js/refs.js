const refs = {
    headerNavContainer: document.querySelector('.header-nav-container'),
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
    votesTitle: document.querySelector('[data-attribute="votesTitle"]'),
    popularityTitle: document.querySelector('[data-attribute="popularityTitle"]'),
    originalTitle: document.querySelector('[data-attribute="originalTitle"]'),
    genresTitle: document.querySelector('[data-attribute="genresTitle"]'),

    addToWatchedBtn: document.querySelector('.modal__btn--watched'),
    addToQueueBtn: document.querySelector('.modal__btn--queue'),


//  =======


  pageLibraryRef: () => document.querySelector('[data-request="library"]'),


  //=======
    divLightbox: document.querySelector('.lightbox'),
    btnClose: document.querySelector('.lightbox__button'),
    modalClose: document.querySelector('.lightbox__body'),
    openModal: document.querySelector('.js-footer__text'),
    
    



  // ========= после перемены Хедера!

  siteNavButtons: document.querySelector('.site-nav__list'),
  logoNav: document.querySelector('.logo-container'),
  libraryList: document.querySelector('.library__list'),
  searchForm: document.querySelector('.search-form'),
  homeHeaderBtn: document.querySelector('.js-home'),
  libraryHeaderBtn: document.querySelector('.js-library'),
  watchedBtn: document.querySelector('[data-request="watched"]'),
  queueBtn: document.querySelector('[data-request="queue"]'),
};

export default refs;