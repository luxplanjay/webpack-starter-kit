const refs = {
  gallery: document.querySelector('.movies__list'),
  modal: document.querySelector('.lightbox__card'),
  paginationWrapper: document.querySelector('.js-pagination-wrapper'),
  paginationPrevButton: document.querySelector('.pagination-prev-button'),
  paginationNextButton: document.querySelector('.pagination-next-button'),
  authorsButton: document.querySelector('.footer_container__authors__button'),
  paginationContainer: document.querySelector('.movies__pagination-container'),
  searchInputRef: document.querySelector('input[name="search"]'),
  noResultRef: document.querySelector('.no-results'),
  microphone: document.querySelector('.microphone'),
  registerForm: document.querySelector('.modal__form-registration'),
  loginForm: document.querySelector('.modal__form-login'),
  signInModal: document.querySelector('.backdrop[data-modal-signin]'),
  signUpBtn: document.querySelector('.site-nav__signup'),
  signInBtn: document.querySelector('.site-nav__signin'),
  logOutBtn: document.querySelector('.logout-js'),
  signUpModal: document.querySelector('.backdrop[data-modal-signup]'),
  signUpNowBtn: document.querySelector('.signup-now__button'),
  spinner: document.querySelector('.square'),
};

export default refs;
