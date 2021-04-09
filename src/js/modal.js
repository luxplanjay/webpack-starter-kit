import refs from './refs';
import renderCardFilmInModal from './fnRenderMarkupCardFilm';
import emptyJpg from '../images/empty-img.jpg';
import fetchOneFilm from './findOneFilm';
import { initStorageBtns } from './fnAddToLocalStorage';

refs.galleryId.addEventListener('click', onImageClick);
refs.btnClose.addEventListener('click', closeModal);
refs.overlay.addEventListener('click', closeModal);

function openModal(movieId) {
      window.addEventListener('keydown', closeModalToPressEscape);
      refs.modal.classList.add('is-open');
      refs.body.classList.add('scroll-hidden');
      refs.modalContent.innerHTML = '';

      fetchOneFilm(movieId)
            .then(({ id, poster_path, title,
                        release_date, genre_ids,
                        vote_average, vote_count, original_title,
                        genres, overview, popularity }) => {
                        let img = poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : emptyJpg;
                  let movie = ({
                        id, title, release_date, genre_ids,
                        img, vote_average, vote_count, original_title,
                        genres, overview, popularity
                  });
                  renderCardFilmInModal(movie);
                  initStorageBtns();
            })
    
}


function onImageClick(event) {
      if (event.target === document.querySelectorAll(".move-card")) { console.log(event.target) }

      if (event.target.nodeName !== 'IMG') {
            return;
      }

      if (event.target.dataset.emptyPage) {
            return;
      }

      const activeImg = event.target;
      const movieId = activeImg.dataset.movieId;

  openModal(movieId);
}


function closeModal() {
      window.removeEventListener('keydown', closeModalToPressEscape);
      refs.modal.classList.remove('is-open');
      refs.body.classList.remove('scroll-hidden');
      
}

function closeModalToPressEscape(event) {
      if (event.code === 'Escape') {
            closeModal();
      }
}

export { closeModalToPressEscape }