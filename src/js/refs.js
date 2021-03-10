const refs = {
  //navigation
  home: document.querySelector('.home-link'),
  library: document.querySelector('.lib-link'),
  header: document.querySelector('.header'),
  search: document.querySelector('.form-search'),
  buttonHeader: document.querySelector('.button-header'),
  hits: document.querySelector('movie-searchTag'),
  logo: document.querySelector('.logo-icon'),
  headerTitle: document.querySelector('.link-title'),
  backgroundHome: document.querySelector('.header-home'),
  gallery: document.querySelector('.movies-container'),
  pagination: document.querySelector('.pagination'),
  footer: document.querySelector('footer'),
  myLibraryBtn: document.querySelector('.lib-link'),
  inputForm: document.querySelector('.form-search'),
  homeBtn: document.querySelector('.home-link'),
  watchedBtn: document.querySelector('.button-watched'),
  queueBtn: document.querySelector('.button-queque'),
  body: document.querySelector('body'),
  errorContainerRef: document.querySelector('.error-container-js'),
  movieInputRef: document.querySelector('.movie-searchTag-js'),
  myLibraryButton: document.querySelector('.lib-link'),
  //modal
  filmCard: document.querySelector('.film-card'),
  movieModal: document.querySelector('.movie-modal'),
  backdrop: document.querySelector('.backdrop'),
  // closeModalBtn: document.querySelector('.close-button'),
  movieContainer: document.querySelector('.movies-container-js'),
  // modal header
  openModalHeaderBtn: document.querySelector('[data-modal-header-open]'),
  modalHeader: document.querySelector('.js-lightbox-header'),
  closeModalHeaderBtn: document.querySelector('.lightbox-button-header'),
  overlayHeader: document.querySelector('.lightbox-overlay-header'),
  // modal footer
  openModalFooterBtn: document.querySelector('[data-modal-footer-open]'),
  modalFooter: document.querySelector('.js-lightbox'),
  closeModalFooterBtn: document.querySelector('.lightbox-button'),
  overlayFooter: document.querySelector('.lightbox-overlay'),
  // team
  ourTeamRefs: document.querySelector('.footer-team-link'),
};

export default refs;
