import filmCard from '../templates/film-card.hbs';
import paginationList from '../templates/pagination.hbs';
import refs from './refs';

export default {
  additemList({ results, total_pages }, perPage) {
    const numStart = 0;
    const numEnd = numStart + perPage;
    console.log(numStart, numEnd + 1);
    if (total_pages === 0) {
      //подумать как вывести сообщение, что ничего не найдено
    }
    refs.filmListRef.innerHTML = '';
    refs.filmListRef.insertAdjacentHTML(
      'beforeend',
      filmCard(results.slice(numStart, numEnd)),
    );
  },
};
