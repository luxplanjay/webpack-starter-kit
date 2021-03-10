// import '../node_modules/spinkit/spinkit.css';

import refs from './refs';

export default {
  spinnerShow() {
    console.log('показать');
    refs.spinner.classList.remove('is-hidden__spinner');
  },

  spinnerClose() {
    console.log('скрыть');
    refs.spinner.classList.add('is-hidden__spinner');
  },
};
