import './sass/main.scss';
import refs from './js/refs';
import './js/up-btn';
import './js/header-position';
import './js/storage';
import './js/themes';
import './js/theme-change';
import './js/footermodal.js';

import './js/modal';
import './js/modal-close';
import './js/movieLibrary';
import '../node_modules/spinkit/spinkit.css';

// import createHeaderHomeMarkup from './js/header-render';
// createHeaderHomeMarkup();

import fnFetch from './js/fetch.js';
import fnHendler from './js/fnHendler.js';

import { HOME } from './js/request.js';
import { save } from './js/storage';
// import modal from './js/modal';

import './js/change-header-theme';
import './js/library-list-hendler';
import './js/spinner';


const searchFormRef = document.querySelector('.search-form');
const errorNoteRef = document.querySelector('.header__error');
save('currentRequest', HOME);

fnFetch.fetchData();

searchFormRef.addEventListener('submit', fnHendler.onSubmitSearchForm);
refs.paginationBox.addEventListener('click', fnHendler.onClickPaginate);
refs.filmListRef.addEventListener('click', fnHendler.onClickFilm);
refs.libraryHeaderBtn.addEventListener('click', fnHendler.onClickLibrary);
refs.watchedBtn.addEventListener('click', fnHendler.onClickWatched);
refs.queueBtn.addEventListener('click', fnHendler.onClickQueue);
refs.logoNav.addEventListener('click', fnHendler.onClickLogoHome);
refs.homeHeaderBtn.addEventListener('click', fnHendler.onClickLogoHome);



