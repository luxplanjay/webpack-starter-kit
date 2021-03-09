// import './modal.js'
import refs from './refs';

function nodeCheckClosing(event) {
  if (event.target.nodeName !== 'DIV') {
    return;
  }
  closingModal();
}

refs.closeBtn.addEventListener('click', closingModal);
refs.backdropModalRef.addEventListener('click', nodeCheckClosing);
refs.filmListRef.addEventListener('click', openingModal);

function openingModal() {
  const id = event.path.find(elem => elem.classList.value === 'film item')
    .dataset.movieid;
  
  const all = JSON.parse(localStorage.getItem('watched') || '[]');
  if (all.includes(id)) {
    refs.addToWatchedBtn.innerHTML = 'REMOVE FROM WATCHED';
  }

  const all2 = JSON.parse(localStorage.getItem('queue') || '[]');
  if (all2.includes(id)) {
    refs.addToQueueBtn.innerHTML = 'REMOVE FROM QUEUE';
  }

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
  refs.addToWatchedBtn.innerHTML = 'ADD TO WATCHED';
  refs.addToQueueBtn.innerHTML = 'ADD TO QUEUE';
}

function onEscPress(event) {
  if (event.code === 'Escape') closingModal();
}

export default openingModal;
