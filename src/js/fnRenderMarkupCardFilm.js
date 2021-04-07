import refs from './refs';
import movieModalTpl from '../tamplates/movieModal.hbs';

function updateCardFilmInModal(movie) {

    let markup = '';

    if (movie.status !== '404') {
        movie.popularity = Math.round(movie.popularity);
        markup = movieModalTpl(movie);
    }
    refs.modalContent.insertAdjacentHTML('beforeend', markup);
}

export default updateCardFilmInModal;