const divLightbox = document.querySelector('.lightbox');
// const largeImage = document.querySelector('.lightbox__image');
const btnClose = document.querySelector('.lightbox__button');
const modalClose = document.querySelector('.lightbox__body');
const openModal = document.querySelector('.js-footer__text');

openModal.addEventListener('click', onOpenModal);
btnClose.addEventListener('click', onModalClose);
modalClose.addEventListener('click', onModalCloseDiv);
document.addEventListener('keydown', onModalCloseEsc);


function onModalCloseDiv(event) {
  divLightbox.classList.remove('is-open');
 }

function onModalClose(event) {
  if (event.target.nodeName === 'BUTTON') {
    onModalCloseDiv();
  }
}

function onModalCloseEsc(event) {
  if (event.key === 'Escape') {
    onModalCloseDiv();
  }
}

function onOpenModal(event) {
    divLightbox.classList.add('is-open');
}


 