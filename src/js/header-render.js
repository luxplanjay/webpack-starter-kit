// import headerHomeTemplate from '../templates/header-home-template.hbs';
// import headerLibraryTemplate from '../templates/header-lib-template.hbs';
// import refs from './refs';
// import fnFetch from './fetch.js';
// import fnHendler from './fnHendler';
// import { HOME, SEARCH, WATCHED, QUEUE } from './request.js';
// import { load, save, remove } from './storage';



// let logoNavRef;
// let siteNavButtonsRef;
// // let buttonHomeRef;
// let markup;


// function createHeaderHomeMarkup() {
//   markup = headerHomeTemplate();

//   setHeaderMarkup(markup);

//   if (refs.headerRef.classList.contains('header-container--library')) {
//     refs.headerRef.classList.remove('header-container--library');
//   }

//   save('currentRequest', 'home');
//   fnFetch.fetchData();
//   const searchFormRef = document.querySelector('.search-form');
//   const errorNoteRef = document.querySelector('.header__error');
//   save('currentRequest', HOME);
//   searchFormRef.addEventListener('submit', fnHendler.onSubmitSearchForm);
// }

// function createHeaderLibraryrMarkup() {
//   const library = 'library';

//   markup = headerLibraryTemplate();

//   setHeaderMarkup(markup, library);

//   refs.headerRef.classList.add('header-container--library');
//   save('currentRequest', QUEUE);
//   fnFetch.fetchDataLibrary(1, load(QUEUE));
// }

// function setHeaderMarkup(value, page) {
//   refs.headerRef.innerHTML = '';
//   refs.headerRef.insertAdjacentHTML('beforeend', value);

//   siteNavButtonsRef = document.querySelector('.site-nav__list');
//   logoNavRef = document.querySelector('.logo-container');
// //   buttonHomeRef = document.querySelector('.js-home');

//   logoNavRef.addEventListener('click', handlerSiteNavButtonsClick);
//   siteNavButtonsRef.addEventListener('click', handlerSiteNavButtonsClick);
//     // bodyEl = document.querySelector('body');
//     // checkboxEl = document.querySelector(
//     //       '#theme-switch-toggle');
//     //   checkboxEl.addEventListener('change', () => console.log('меняем тему'));

//   if (page === 'library') {
//     const watchedButtonRef = document.querySelector(
//       '.button[data-request="watched"]',
//     );
//     const queueButtonRef = document.querySelector(
//       '.button[data-request="queue"]',
//       );
      
//       watchedButtonRef.addEventListener('click', () => {
        
//           if (watchedButtonRef.classList.contains('is-active')) return;
//           else {
//               toggleButtonsClass(watchedButtonRef, queueButtonRef);
//               save('currentRequest', WATCHED);
//               fnFetch.fetchDataLibrary(1, load(WATCHED));
              
//             }
//       });
      
//       queueButtonRef.addEventListener('click', () => {
//          if (queueButtonRef.classList.contains('is-active')) return;
//             else {
//               toggleButtonsClass(watchedButtonRef, queueButtonRef);
//               save('currentRequest', QUEUE);
//               fnFetch.fetchDataLibrary(1, load(QUEUE));
              
//             }
        
//     });
//   }
// }

// function handlerSiteNavButtonsClick(event) {
//   const element = event.target;

//   if (
//     element.nodeName === 'BUTTON') {
//     element.textContent === 'My library'
//       ? createHeaderLibraryrMarkup()
//       : createHeaderHomeMarkup();
//   } else if (
//     element.parentElement === logoNavRef
//   ) {
//     createHeaderHomeMarkup();
//   } 
// }

// function toggleButtonsClass(watch, queue) {
//     watch.classList.toggle('is-active');
//     queue.classList.toggle('is-active');
// }

// export default createHeaderHomeMarkup;
