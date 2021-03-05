// import refs from '/js/refs';
import headerHomeTemplate from '../templates/header-home-template.hbs';
import refs from './refs';

function headerRenderMarcup() {
    const markup = headerHomeTemplate();
    refs.headerRef.insertAdjacentHTML('beforeend', markup);

}

export default headerRenderMarcup;