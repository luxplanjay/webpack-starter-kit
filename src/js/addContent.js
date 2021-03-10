import filmCard from '../templates/film-card.hbs';
import apiService from './apiService';
import refs from './refs';
// import keyWords from './keyWords';

const pathForImg = 'https://image.tmdb.org/t/p/w342/';
const imgDefault = './images/default-opt.jpg';

export default {
  additemList(listFilms, detalsFilms) {
    const resultForMarkup = listFilms.map(elem => {
      const genresFilm = detalsFilms.find(item => item.id === elem.id).genres;

      const genres =
        genresFilm.length > 2
          ? [...genresFilm.slice(0, 2), { id: 999, name: 'Other' }]
          : genresFilm;

      return {
        ...elem,
        poster_path: elem.poster_path ? pathForImg + elem.poster_path : false,
        release_date: elem.release_date ? elem.release_date.slice(0, 4) : '',
        genres,
      };
    });

    refs.filmListRef.innerHTML = '';
    refs.filmListRef.insertAdjacentHTML('beforeend', filmCard(resultForMarkup));
    console.log(refs.filmListRef);
  },

  addLibraryList(listFilms) {
    if (!listFilms || !listFilms.length) {
      refs.filmListRef.innerHTML = '';
      refs.paginationList.innerHTML = '';
      return;
    }
    const resultForMarkup = listFilms.map(elem => {
      const genres =
        elem.genres.length > 2
          ? [...elem.genres.slice(0, 2), { id: 999, name: 'Other' }]
          : elem.genres;

      return {
        ...elem,
        poster_path: elem.poster_path
          ? pathForImg + elem.poster_path
          : imgDefault,
        release_date: elem.release_date ? elem.release_date.slice(0, 4) : '',
        genres,
      };
    });

    refs.filmListRef.innerHTML = '';
    refs.filmListRef.insertAdjacentHTML('beforeend', filmCard(resultForMarkup));
  },
};
