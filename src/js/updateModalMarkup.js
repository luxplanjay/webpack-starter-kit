import modalTpl from '../templates/modal.hbs';

function updateModalMarkup(data) {
  const markupModal = modalTpl(data);
  return markupModal;
}

export default updateModalMarkup;
