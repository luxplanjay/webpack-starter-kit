import filmCard from '../templates/film-card.hbs';
import refs from './refs';
const pathForImg = 'https://image.tmdb.org/t/p/w500/';

export default {
  additemList(results) {
    const resultForMarkup = results.map(elem => {
      return {
        ...elem,
        poster_path: pathForImg + elem.poster_path,
        release_date: elem.release_date ? elem.release_date.slice(0, 4) : '',
      };
    });

    refs.filmListRef.innerHTML = '';
    refs.filmListRef.insertAdjacentHTML('beforeend', filmCard(resultForMarkup));
  },
};
