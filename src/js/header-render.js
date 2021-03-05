
import headerHomeTemplate from '../templates/header-home-template.hbs';
import refs from './refs';

function headerHomeRenderMarcup() {
    const markup = headerHomeTemplate();
    refs.headerRef.insertAdjacentHTML('beforeend', markup);
}

export default headerHomeRenderMarcup;
