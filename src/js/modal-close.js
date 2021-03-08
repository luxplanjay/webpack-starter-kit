// import './modal.js'
import refs from './refs';

function nodeCheckClosing (event) {
  if (event.target.nodeName !== 'DIV') {
    return;
  }
  closingModal();
}

refs.closeBtn.addEventListener('click', closingModal);
refs.backdropModalRef.addEventListener('click', nodeCheckClosing)
refs.filmListRef.addEventListener('click', openingModal)



function openingModal () {
  refs.backdropModalRef.classList.remove('visually-hidden');
  window.addEventListener('keydown', onEscPress);

}

function closingModal() {
  refs.backdropModalRef.classList.add('visually-hidden');
  window.removeEventListener('keydown', onEscPress);
  refs.modalImg.src = '';
  refs.modalTitle.textContent = '';
  refs.rate.textContent = '';
  refs.votes.textContent = '';
  refs.popularity.textContent = '';
  refs.title.textContent = '';
  refs.genre.textContent = '';
  refs.descr.textContent = '';
}

function onEscPress(event) {
  if (event.code === 'Escape') 
  closingModal();
}

export default openingModal
  
  