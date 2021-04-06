import refs from './refs';
import createCard from './popular-gallery';
import hendlerInput from './search';
import FilmsStorage from './local-storage';

const filmsStorage = new FilmsStorage();

const {
  homeBtn,
  libraryBtn,
  headerBg,
  searchWrap,
  searchInputRef,
  libraryBtnsContainer,
  gallery,
  paginationContainer,
  filter,
  watchedBtn,
} = refs;

homeBtn.addEventListener('click', e => hendlerHomeBtn(e));
libraryBtn.addEventListener('click', e => hendlerLibraryBtn(e));

function hendlerHomeBtn(e) {
  libraryBtn.disabled = false;
  homeBtn.disabled = true;
  headerBg.classList.remove('library__background');
  libraryBtn.classList.remove('current');
  homeBtn.classList.add('current');
  searchWrap.classList.remove('visually-hidden');
  libraryBtnsContainer.classList.add('visually-hidden');
  filter.classList.remove('visually-hidden');
  searchInputRef.value = '';
  createCard();
  paginationContainer.classList.remove('visually-hidden');
  for (let i = 0; i < btns.length; i++) {
    const current = libraryBtnsContainer.getElementsByClassName(' active');
    if (current.length > 0) {
      current[i].classList.remove('active');
    }
  }
}

function hendlerLibraryBtn(e) {
  libraryBtn.disabled = true;
  homeBtn.disabled = false;

  homeBtn.classList.remove('current');
  libraryBtn.classList.add('current');
  headerBg.classList.add('library__background');
  searchWrap.classList.add('visually-hidden');
  libraryBtnsContainer.classList.remove('visually-hidden');
  filter.classList.add('visually-hidden');
  gallery.innerHTML = '';
  filmsStorage.showWatchedFilms();
  if (gallery.textContent) {
    watchedBtn.classList.add('active');
  }
  paginationContainer.classList.add('visually-hidden');
}

refs.watchedBtn.addEventListener('click', filmsStorage.showWatchedFilms);
refs.queueBtn.addEventListener('click', filmsStorage.showFilmsQueue);

const btns = libraryBtnsContainer.getElementsByClassName('button');

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const current = libraryBtnsContainer.getElementsByClassName(' active');

    if (current.length > 0) {
      current[0].className = current[0].className.replace(' active', '');
    }

    this.className += ' active';
  });
}
