import refs from './refs';

refs.openModal.addEventListener('click', onOpenModal);
refs.btnClose.addEventListener('click', onModalClose);
refs.modalClose.addEventListener('click', onModalCloseDiv);
document.addEventListener('keydown', onModalCloseEsc);


function onModalCloseDiv(event) {
    refs.divLightbox.classList.remove('is-open');
    refs.bodyEl.classList.remove('is-open');
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
    refs.divLightbox.classList.add('is-open');
    refs.bodyEl.classList.add('is-open');
}