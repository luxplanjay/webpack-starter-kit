import refs from './refs.js';

// modified by MAryasov
import { libraryMarkup } from './components/library';
// temporary data:
// const testData = {
//   cards:[
//       {
//         poster_path: "https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
//         title: "Titanic",
//         genre_ids: '18, 10749',
//         release_date: "2010-08-07",
//         vote_average: 7.9
//       },
//       {
//         poster_path: "https://image.tmdb.org/t/p/original/e9XRikkyth0GtG8RkU3XNm0oMsA.jpg",
//         title: "Titanic II",
//         genre_ids: '28, 12, 53',
//         release_date: "2010-08-07",
//         vote_average: 4.6
//       },
//       {
//         poster_path: "https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
//         title: "Titanic",
//         genre_ids: '18, 10749',
//         release_date: "2010-08-07",
//         vote_average: 7.9
//       }
//   ]
// }

const watchedItems = localStorage.getItem('filmsWatched');
const parsedWatchedItems = JSON.parse(watchedItems);

const watchedData = {
  cards: parsedWatchedItems,
};
//
refs.navLibrary.addEventListener('click', openLibrary);
refs.buttonWatched.addEventListener('click', openLibrary);

function openLibrary(event) {
  event.preventDefault();
  refs.searchForm.classList.add('is-hidden');
  refs.homeGallery.classList.add('is-hidden');
  refs.buttons.classList.remove('is-hidden');
  // modified by MAryasov
  refs.myLibraryGallery.textContent = '';
  refs.myLibraryGallery.insertAdjacentHTML(
    'afterbegin',
    libraryMarkup(watchedData).trim(),
  );
  //
  refs.myLibraryGallery.classList.remove('is-hidden');
  refs.errorWarning.classList.add('is-hidden');
  refs.underscoreOnMyLibrary.classList.remove('is-hidden');
  refs.underscoreOnHome.classList.add('is-hidden');
}
