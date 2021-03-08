
import headerHomeTemplate from '../templates/header-home-template.hbs';
import headerLibraryTemplate from '../templates/header-lib-template.hbs';
import refs from './refs';

let logoNavRef;
let siteNavButtonsRef;
let buttonHomeRef;
let markup;


function createHeaderHomeMarkup() {
    markup = headerHomeTemplate();

    setHeaderMarkup(markup);
    
    if (refs.headerRef.classList.contains("header-container--library")) {
        refs.headerRef.classList.remove("header-container--library");
    }
}

function createHeaderLibraryrMarkup() {
    markup = headerLibraryTemplate();

    setHeaderMarkup(markup);

    refs.headerRef.classList.add("header-container--library");
}

function setHeaderMarkup(value) {
    refs.headerRef.innerHTML = '';
    refs.headerRef.insertAdjacentHTML('beforeend', value);

    siteNavButtonsRef = document.querySelector('.site-nav__list');
    logoNavRef = document.querySelector('.logo-container');
    buttonHomeRef = document.querySelector('.js-home');

    logoNavRef.addEventListener('click', handlerSiteNavButtonsClick);
    siteNavButtonsRef.addEventListener('click', handlerSiteNavButtonsClick);
}


function handlerSiteNavButtonsClick(event) {
    const element = event.target;
    // console.log(element.parentNode);
    if (element.nodeName === "BUTTON" && !element.classList.contains('is-active')) {
        element.textContent === 'My library' ? createHeaderLibraryrMarkup() : createHeaderHomeMarkup();

    } else {
        !buttonHomeRef.classList.contains('is-active') ? createHeaderHomeMarkup() : console.log(5);
    } else if (!buttonHomeRef.classList.contains('is-active')) {
        createHeaderHomeMarkup();
    } 
}

export default createHeaderHomeMarkup;




