
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

function setHeaderMarkup(value) {
    refs.headerRef.innerHTML = '';
    refs.headerRef.insertAdjacentHTML('beforeend', value);
    const siteNavButtonsRef = document.querySelector('.site-nav__list');
    const buttonHomeRef = document.querySelector('button[data="home"]');
    const logoRef = document.querySelector('.header__logo');

    siteNavButtonsRef.addEventListener('click', handlerSiteNavButtonsClick);
    logoRef.addEventListener('click', () => {
        if (buttonHomeRef.classList.contains('is-active')) {
            return;
        } else {
            createHeaderHomeMarkup();
        }
    });
}

function handlerSiteNavButtonsClick(event) {
    const element = event.target;

    if (element.nodeName !== "BUTTON" || element.classList.contains('is-active')) {
        return;
    } else {
        element.textContent === 'My library' ? createHeaderLibraryrMarkup() : createHeaderHomeMarkup();     
    }   
}


export default createHeaderHomeMarkup;





//    const siteNavButtonsRef = document.querySelector('.site-nav__list');
//     const logoRef = document.querySelector('.header__logo');

//     siteNavButtonsRef.addEventListener('click', (event) => {
//         foo(event, siteNavButtonsRef, logoRef);
//     });
    
// }

// function foo(event, but, logo) {
//     const element = event.target;

//     if (element.nodeName !== "BUTTON" || element.classList.contains('is-active') || element !== logo) {
//         return;
//     } else if (element === logo && but.firstChild.classList.contains('is-active')) { 
//         createHeaderLibraryrMarkup();

//     }else {
//         element.textContent === 'My library' ? createHeaderLibraryrMarkup() : createHeaderHomeMarkup();     
//     }   
// }



