
  export default {
    show() {
        document.querySelector('.spinner').classList.remove('is-hidden');
    },
    hide() {
        document.querySelector('.spinner').classList.add('is-hidden');
    },
  };