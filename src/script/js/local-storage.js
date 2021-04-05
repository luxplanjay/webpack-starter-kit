import refs from './refs';
import Pagination from './pagination-api';

const pagination = new Pagination();

export default class FilmsStorage {
  constructor() {
    this._watchedFilms = [];
    this._filmsQueue = [];
  }
  //watched
  addToWatchedFilm(item) {
    this._watchedFilms.push(item);
    this.saveWatchedFilms();
  }
  removeWathedFilm(item) {
    this._watchedFilms.splice(this._watchedFilms.indexOf(item), 1);
    this.saveWatchedFilms();
  }
  saveWatchedFilms() {
    localStorage.setItem('watched-films', JSON.stringify(this._watchedFilms));
  }
  showWatchedFilms() {
    const savedFilms = localStorage.getItem('watched-films');
    if (!savedFilms) alert('Your watchedlist is emty.');
    let watchedFilmsMarkup = '';
    JSON.parse(savedFilms).forEach(object => {
      watchedFilmsMarkup +=
        '<li class="movies__list-item">' + object.element + '</li>';
    });

    refs.gallery.innerHTML = watchedFilmsMarkup;
  }
  getWathedListFromLS() {
    if (!localStorage.getItem('watched-films')) return;
    this._watchedFilms = JSON.parse(localStorage.getItem('watched-films'));
  }
  get watchedFilms() {
    return this._watchedFilms;
  }

  //queue
  addToQueue(item) {
    this._filmsQueue.push(item);
    this.saveFilmsQueue();
  }
  removeFromQueue(item) {
    this._filmsQueue.splice(this._filmsQueue.indexOf(item), 1);
    this.saveFilmsQueue();
  }
  saveFilmsQueue() {
    localStorage.setItem('films-queue', JSON.stringify(this._filmsQueue));
  }
  showFilmsQueue() {
    const queue = localStorage.getItem('films-queue');
    if (!queue) alert('Your queue is emty.');
    let filmsQueueMarkup = '';
    JSON.parse(queue).forEach(object => {
      filmsQueueMarkup +=
        '<li class="movies__list-item">' + object.element + '</li>';
    });

    refs.gallery.innerHTML = filmsQueueMarkup;
  }
  getQueueFromLS() {
    if (!localStorage.getItem('films-queue')) return;
    this._filmsQueue = JSON.parse(localStorage.getItem('films-queue'));
  }
  get filmsQueue() {
    return this._filmsQueue;
  }
}
