export default class Search {
  constructor() {
    this.square = document.querySelector('.square');
  }
  hideSpinner() {
    this.square.classList.add('is-hidden');
  }
  showSpinner() {
    this.square.classList.remove('is-hidden');
  }
}
