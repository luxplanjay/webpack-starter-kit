import filmCard from '../templates/film-card.hbs';
import modalForm from '../templates/modalForm.hbs';
import refs from './refs';
const pathForImg = 'https://image.tmdb.org/t/p/w342/';
const pathForModal = 'https://image.tmdb.org/t/p/w500/';

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

  // addModalForm(results) {
  //   const resultForMarkup = {
  //     ...results,
  //     poster_path: pathForModal + results.poster_path,
  //   };
  //   console.dir(resultForMarkup);
  //   return poster_path
    // refs.modalRef.innerHTML = '';
    // refs.modalRef.insertAdjacentHTML('beforeend', modalForm(resultForMarkup));
    // refs.backdropModalRef.classList.remove('visually-hidden');
  // },
};
