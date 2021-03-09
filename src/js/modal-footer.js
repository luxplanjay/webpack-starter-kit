const refs = {
  openModalFooterBtn: document.querySelector('[data-modal-footer-open]'),
  modalFooter: document.querySelector('.js-lightbox'),
  closeModalFooterBtn: document.querySelector('.lightbox-button'),
    overlayFooter: document.querySelector('.lightbox-overlay'),
}

refs.openModalFooterBtn.addEventListener('click', onOpenModal);
refs.closeModalFooterBtn.addEventListener('click', onCloseModal);



function onOpenModal(e) {

    e.preventDefault()
  window.addEventListener('keydown', onPressESC);
  
  refs.modalFooter.classList.add('is-open');
  refs.overlayFooter.addEventListener('click', onClickOverlay);
}

function onCloseModal(e) {
  window.removeEventListener('keydown', onPressESC);
  
  refs.modalFooter.classList.remove('is-open');
}

function onPressESC(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onClickOverlay(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}
