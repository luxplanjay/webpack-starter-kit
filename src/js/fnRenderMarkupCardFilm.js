import refs from './refs';
import movieModalTpl from '../tamplates/movieModal.hbs';

function updateCardFilmInModal(cardFilm) {

    let markup = '';

    if (cardFilm.status !== '404') {
        cardFilm.popularity = Math.round(cardFilm.popularity);
        markup = movieModalTpl(cardFilm);
    }
    refs.modalContent.insertAdjacentHTML('beforeend', markup);
}

export default updateCardFilmInModal;