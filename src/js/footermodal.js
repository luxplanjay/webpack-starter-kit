import refs from './refs';

refs.openModal.addEventListener('click', onOpenModal);
refs.btnClose.addEventListener('click', onModalClose);
refs.modalClose.addEventListener('click', onModalCloseDiv);
document.addEventListener('keydown', onModalCloseEsc);


function onModalCloseDiv(event) {
    refs.modalClose.classList.add('slideUpOut');
    refs.modalClose.classList.remove('slideUpIn');
    window.setTimeout(function() {
        refs.divLightbox.classList.remove('is-open');
        refs.bodyEl.classList.remove('is-open');
    }, 500);


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
    refs.modalClose.classList.remove('slideUpOut');
    refs.divLightbox.classList.add('is-open');
    refs.bodyEl.classList.add('is-open');
    refs.modalClose.classList.add('slideUpIn');

}