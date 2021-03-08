import refs from './refs.js';

// modified by MAryasov
import {libraryMarkupBuilder} from './components/library';
// temporary data:
const currentPageIDs = [793723, 527774, 9602, 580532];


refs.navLibrary.addEventListener('click', openLibrary);

function openLibrary(event) {
  event.preventDefault();
  refs.searchForm.classList.add('is-hidden');
  refs.homeGallery.classList.add('is-hidden');
  refs.buttons.classList.remove('is-hidden');
  // modified by Maryasov
  refs.libraryList.textContent = '';
  libraryMarkupBuilder(currentPageIDs);
  
  refs.myLibraryGallery.classList.remove('is-hidden');
  refs.errorWarning.classList.add('is-hidden');  
  refs.underscoreOnMyLibrary.classList.remove('is-hidden');
  refs.underscoreOnHome.classList.add('is-hidden');
}
