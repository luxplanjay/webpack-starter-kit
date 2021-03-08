
// // renders pagination for main (first) fetch

const searchFormRef = document.querySelector('.search-form');
const errorNoteRef = document.querySelector('.header__error');

function keyWords(searchQuery) {
  filmApiService.query = searchQuery;

//   filmApiService

//     .then(results => {
//       renderPagination(
//         results.total_pages,
//         results.results,
//         displaySearchListByPage,
//         searchQuery,
//       );
//       if (results.total_pages === 0) {
//         refs.warningField.textContent = `Sorry, there no results found. Try searching for something else!`;
//         refs.searchResField.textContent = '';
   
//         return;
//       }
//       refs.searchResField.textContent = `Yay! We found ${results.total_results} results on request "${searchQuery}"!`;
      
//     })
//     .catch(err => {
//       console.log('error in function fetchDataOfSearchFilms');
     
//     });
}

export default keyWords;