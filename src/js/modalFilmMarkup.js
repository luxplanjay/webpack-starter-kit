import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/src/styles/main.scss';
import updateModal from './updateModal';
import searchMovie from './apiFilmFetch';

function getFilmInfo(movie_id) {
  searchMovie(movie_id).then(film => {
    const cartFilm = updateModal(film);
    const modal = basicLightbox.create(cartFilm);
    modal.onclick = modal.show();
    window.addEventListener('keydown', closeModalByEscape);
      function closeModalByEscape(event) {
          if (event.code === 'Escape') {
              modal.close();
              window.removeEventListener('keydown', closeModalByEscape);
          }
      }
      const crossRef = document.querySelector('.icon-close');
        console.log(crossRef);
      crossRef.addEventListener('click', btnClosedModal)
      function btnClosedModal() { modal.close()
        crossRef.removeEventListener('click', btnClosedModal);}  
  });
       
}

const lightBox = () => {
  let cardIdRef = document.querySelector('.movie-grid');
  cardIdRef.addEventListener('click', openModal);
    function openModal(event) {
        event.preventDefault();
        if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'H2') {
            return;
        }
        console.log("event.target.dataset.id=", event.target.dataset.id)
        getFilmInfo(event.target.dataset.id);
    
    }
     
};
 
export default lightBox;
