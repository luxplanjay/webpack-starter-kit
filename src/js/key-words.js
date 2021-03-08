
// const searchFormRef = document.querySelector('.search-form');
// const errorNoteRef = document.querySelector('.header__error');

import refs from './refs';

function keyWords(listFilms) {
  if (listFilms.length === 0) {
    refs.errorNoteRef.textContent = `Sorry, there no results found. Try searching for something else!`;
    refs.searchFormRef.textContent = '';
      return;
    }
    // refs.searchResField.textContent = `Yay! We found ${results.total_results} results on request "${searchQuery}"!`;
      
}

export default keyWords;