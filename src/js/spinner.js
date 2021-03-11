// import '../node_modules/spinkit/spinkit.css';

import refs from './refs';

export default {
  spinnerShow() {
    refs.spinner.classList.remove('is-hidden__spinner');
  },

  spinnerClose() {
    refs.spinner.classList.add('is-hidden__spinner');
  },
};
