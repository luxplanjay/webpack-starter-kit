import filmCard from '../templates/film-card.hbs';
import paginationList from '../templates/pagination.hbs';
import refs from './refs';

export default {
  additemList({ results, total_pages }) {
    if (total_pages === 0) {
      //подумать как вывести сообщение, что ничего не найдено
    }
    refs.filmListRef.innerHTML = '';
    refs.filmListRef.insertAdjacentHTML('beforeend', filmCard(results));
  },
};
