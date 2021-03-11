const libraryBtn = document.querySelector('.my-library');
const homeBtn = document.querySelector('.library-home');
const libraryRef = document.querySelector('.library-page');
const headerRef = document.querySelector('.main-page');
const modalRef = document.querySelector('.modal');

let arrayWatchedFilms = [];
const localArrayWatchedFilms = localStorage.getItem('arrayWatchedFilm');
if (localArrayWatchedFilms) {
  arrayWatchedFilms = JSON.parse(localArrayWatchedFilms);
  console.log(arrayWatchedFilms);
}

libraryBtn.addEventListener('click', () => {
  libraryRef.style.display = 'block';
  headerRef.style.display = 'none';
});

homeBtn.addEventListener('click', () => {
  libraryRef.style.display = 'none';
  headerRef.style.display = 'block';
});

const addWatchedFilms = movieId => {
  const localArrayWatchedFilms = localStorage.getItem('arrayWatchedFilm');
  if (localArrayWatchedFilms) {
    arrayWatchedFilms = JSON.parse(localArrayWatchedFilms);
    console.log(arrayWatchedFilms);
  }
  if (arrayWatchedFilms.includes(movieId)) {
    const idFilm = arrayWatchedFilms.indexOf(movieId);
    arrayWatchedFilms.splice(idFilm, 1);

    localStorage.setItem('arrayWatchedFilm', JSON.stringify(arrayWatchedFilms));
    return;
  }
  arrayWatchedFilms.push(movieId);
  localStorage.setItem('arrayWatchedFilm', JSON.stringify(arrayWatchedFilms));
};

export default { addWatchedFilms, arrayWatchedFilms };
