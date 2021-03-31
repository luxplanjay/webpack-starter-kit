export default class search {
    constructor() {
      this.square = document.querySelector('.spinner-border');
    }
    hideSpinner() {
      this.square.classList.add('is-hidden');
    }
   showSpinner(){
    this.square.classList.remove('is-hidden');
   }
}