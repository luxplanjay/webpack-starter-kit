import refs from './refs.js';
export default {
  show() {
    document.querySelector('.spinner').classList.remove('is-hidden');
    refs.gallery.innerHTML = '';
  },
  hide() {
    document.querySelector('.spinner').classList.add('is-hidden');
  },
};
