const refs = {
  home: document.querySelector('.home-link'),
  library: document.querySelector('.lib-link'),
  header: document.querySelector('.header'),
  search: document.querySelector('.form-search'),
  buttonHeader: document.querySelector('.button-header'),
  watchedBtn: document.querySelector('button-watched'),
  queueBtn: document.querySelector('button-queque'),
};

refs.home.addEventListener('click', activeHome);
refs.library.addEventListener('click', activelibrary);

function activeHome(e) {
  e.preventDefault();

  refs.header.classList.replace('header-lib', 'header-home');
  refs.search.classList.remove('is-hidden');
  refs.buttonHeader.classList.add('is-hidden');
  refs.library.classList.remove('active');
  refs.home.classList.add('active');
  refs.watchedBtn.classList.add('is-hidden');
  refs.queueBtn.classList.add('is-hidden');
}

function activelibrary(e) {
  e.preventDefault();

  refs.header.classList.replace('header-home', 'header-lib');
  refs.buttonHeader.classList.remove('is-hidden');
  refs.search.classList.add('is-hidden');
  refs.home.classList.remove('active');
  refs.library.classList.add('active');
  refs.watchedBtn.classList.remove('active-btn');
  refs.queueBtn.classList.add('active-btn');
}
function activeBorder() {
  refs.home.classList.toggle('active');
  refs.library.classList.toggle('active');
}
