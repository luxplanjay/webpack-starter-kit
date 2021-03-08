import refs from './refs';
//inport apiServise from './fetchAPIandMovieList/fetchAPI.js';

refs.homeBtn.addEventListener('click', activeHomePage);
refs.logo.addEventListener('click', activeHomePage);
refs.headerTitle.addEventListener('click', activeHomePage);

function activeHomePage(event) {
  event.preventDefault();
  addClassHome();
}

function addClassHome() {
  refs.backgroundHome.classList.remove('header-lib');
  refs.backgroundHome.classList.add('header-home');

  refs.homeBtn.classList.add('active');
  refs.myLibraryBtn.classList.remove('active');

  refs.inputForm.classList.remove('is-hidden');
  refs.bntlibrary.classList.add('is-hidden');
}
