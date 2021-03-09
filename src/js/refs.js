const refs = {
    headerRef: document.querySelector('.header-container'),
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

    divLightbox: document.querySelector('.lightbox'),
    btnClose: document.querySelector('.lightbox__button'),
    modalClose: document.querySelector('.lightbox__body'),
    openModal: document.querySelector('.js-footer__text'),
    //  =======

    pageNavRef: () => document.querySelector('.site-nav__list'),
    pageHomeRef: () => document.querySelector('[data-request="home"]'),
    pageLibraryRef: () => document.querySelector('[data-request="library"]'),
    pageWatchedRef: () => document.querySelector('[data-request="watched"]'),
    pageQueueRef: () => document.querySelector('[data-request="queue"]'),

};

export default refs;