import refs from './refs';
import renderCardFilmInModal from './fnRenderMarkupCardFilm'; //фн. создания разметки в модалке

refs.gallery.addEventListener('click', openModal);
refs.btnClose.addEventListener("click", closeModal);
refs.overlay.addEventListener('click', closeModal);

// function onImageClick(event) {}

function openModal() { //movieId
      window.addEventListener('keydown', closeModalToPressEscape);
      refs.modal.classList.add('is-open');
      refs.body.classList.add('scroll-hidden');

      refs.modalContent.innerHTML = '';
      //тут будет функция
      //fetch которая 
      //возвращает промис с данными 
      // о фильме и использует фн. renderCardFilmInModal(cardFilm) 
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
