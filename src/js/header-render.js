import headerHomeTemplate from '../templates/header-home-template.hbs';
import headerLibraryTemplate from '../templates/header-lib-template.hbs';
import refs from './refs';
import fnFetch from './fetch.js';
import { HOME, SEARCH, WATCHED, QUEUE } from './request.js';
import { load, save, remove } from './storage';

let logoNavRef;
let siteNavButtonsRef;
let buttonHomeRef;
let markup;

function createHeaderHomeMarkup() {
  markup = headerHomeTemplate();

  setHeaderMarkup(markup);

  if (refs.headerRef.classList.contains('header-container--library')) {
    refs.headerRef.classList.remove('header-container--library');
  }

  save('currentRequest', 'home');
  fnFetch.fetchData();
}

function createHeaderLibraryrMarkup() {
  const library = 'library';

  markup = headerLibraryTemplate();

  setHeaderMarkup(markup, library);

  refs.headerRef.classList.add('header-container--library');
  save('currentRequest', QUEUE);
  fnFetch.fetchDataLibrary(1, load(QUEUE));
}

function setHeaderMarkup(value, page) {
  refs.headerRef.innerHTML = '';
  refs.headerRef.insertAdjacentHTML('beforeend', value);

  siteNavButtonsRef = document.querySelector('.site-nav__list');
  logoNavRef = document.querySelector('.logo-container');
  buttonHomeRef = document.querySelector('.js-home');

  logoNavRef.addEventListener('click', handlerSiteNavButtonsClick);
  siteNavButtonsRef.addEventListener('click', handlerSiteNavButtonsClick);

  if (page === 'library') {
    const watchedButtonRef = document.querySelector(
      '.button[data-request="watched"]',
    );
    const libraryButtonRef = document.querySelector(
      '.button[data-request="queue"]',
    );

    watchedButtonRef.addEventListener('click', () => {
      save('currentRequest', WATCHED);
      fnFetch.fetchDataLibrary(1, load(WATCHED));
    });
    libraryButtonRef.addEventListener('click', () => {
      save('currentRequest', QUEUE);
      fnFetch.fetchDataLibrary(1, load(QUEUE));
    });
  }
}

function handlerSiteNavButtonsClick(event) {
  const element = event.target;

  if (
    element.nodeName === 'BUTTON' &&
    !element.classList.contains('is-active')
  ) {
    element.textContent === 'My library'
      ? createHeaderLibraryrMarkup()
      : createHeaderHomeMarkup();
  } else if (
    element.parentElement === logoNavRef &&
    !buttonHomeRef.classList.contains('is-active')
  ) {
    createHeaderHomeMarkup();
  }
}

export default createHeaderHomeMarkup;
