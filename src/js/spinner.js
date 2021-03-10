// import '../node_modules/spinkit/spinkit.css';

import refs from './refs';

function spinnerShow() {
  refs.spinner.classList.remove('is-hidden');
}

function spinnerClose() {
  refs.spinner.classList.add('is-hidden');

}

export default spinnerClose;


