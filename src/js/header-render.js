// import refs from '/js/refs';
import headerTemplate from '../templates/header-template.hbs';
import refs from './refs';

function headerRenderMarcup() {
    const markup = headerTemplate();
    refs.headerRef.insertAdjacentHTML('beforeend', markup);

}

export default headerRenderMarcup;