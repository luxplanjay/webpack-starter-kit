'../scss/styles.scss';
import modalTpl from "../templates/modal.hbs"

function updateModal(film) {
  const markup = modalTpl(film);  
  return markup;
}
export default updateModal;