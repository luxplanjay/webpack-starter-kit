
import headerHomeTemplate from '../templates/header-home-template.hbs';
import headerLibraryTemplate from '../templates/header-lib-template.hbs';
import refs from './refs';


function createHeaderHomeMarkup() {
    const markup = headerHomeTemplate();

    setHeaderMarkup(markup);
}

function createHeaderLibraryrMarkup() {
    const markup = headerLibraryTemplate();

    setHeaderMarkup(markup);    
}

let logoNavRef;
let siteNavButtonsRef;
let buttonHomeRef;

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
    console.log(element.parentNode);
    if (element.nodeName === "BUTTON" && !element.classList.contains('is-active')) {
        element.textContent === 'My library' ? createHeaderLibraryrMarkup() : createHeaderHomeMarkup();
    } else {
        !buttonHomeRef.classList.contains('is-active') ? createHeaderHomeMarkup() : console.log(5);
    } 
}

export default createHeaderHomeMarkup;




