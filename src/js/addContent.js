import filmCard from '../templates/film-card.hbs';
import refs from './refs';
const pathForImg = 'https://image.tmdb.org/t/p/w342/';
const imgDefault = './images/default.jpg';

export default {
  additemList(listFilms, detalsFilms) {
    const resultForMarkup = listFilms.map(elem => {
      const genresFilm = detalsFilms.find(item => item.id === elem.id);

      return {
        ...elem,
        poster_path: elem.poster_path
          ? pathForImg + elem.poster_path
          : imgDefault,
        release_date: elem.release_date ? elem.release_date.slice(0, 4) : '',
        genres: genresFilm.genres,
      };
    });

    refs.filmListRef.innerHTML = '';
    refs.filmListRef.insertAdjacentHTML('beforeend', filmCard(resultForMarkup));
  },
};
