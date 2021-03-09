import refs from './refs';

import ourTeamTemplate from '../template/ourTeam.hbs';
import ourTeam from './our-team';

// listener header
refs.openModalHeaderBtn.addEventListener('click', onOpenModalHeader);
refs.closeModalHeaderBtn.addEventListener('click', onCloseModalHeader);
// listener footer
refs.openModalFooterBtn.addEventListener('click', onOpenModal);
refs.closeModalFooterBtn.addEventListener('click', onCloseModal);

// ------------------function header-----------------

function onOpenModalHeader(e) {
    e.preventDefault();
    window.addEventListener('keydown', onPressModalHeaderESC);

    refs.modalHeader.classList.add('is-open');
    refs.overlayHeader.addEventListener('click', onClickOverlayHeader);
};
function onCloseModalHeader() {
    window.removeEventListener('keydown', onPressModalHeaderESC);

    refs.modalHeader.classList.remove('is-open');
};
function onPressModalHeaderESC(e) {
    if (e.code === 'Escape') {
    onCloseModalHeader();
  }
};
function onClickOverlayHeader(e) {
    if (e.target === e.currentTarget) {
    onCloseModalHeader();
  }
};

// ---------------function footer-------------------

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

const markupTeam = ourTeamTemplate(ourTeam);
refs.ourTeamRefs.insertAdjacentHTML('beforeend', markupTeam);
