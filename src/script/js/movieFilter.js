import MovieFilter from '../API/fetchFilter'
import PopularFilms from '../API/fetchPopular';
import refs from '../js/refs';
import createMarkup from '../templates/galleryCard.hbs';
import settings from './settings';

const movieFilter = new MovieFilter();
const fetchPopularMovie = new PopularFilms();

refs.chooseGenre.addEventListener('change', event => {
    fetchPopularMovie.resetPage();
    if (event.target.value === "") {
        fetchPopularMovie
            .fetchPopular()
            .then(res => {
                scrollWin();
                refs.gallery.innerHTML = createMarkup(transformMovieObject(res.results));
            }); 
    } else {
        createCard(event.target.value, '');
        setTimeout(() => {
          event.target.value = '';
        }, 1500);
    }
    
});

refs.chooseYear.addEventListener('change', event => {
    fetchPopularMovie.resetPage();
    if (event.target.value === "") {
        fetchPopularMovie
            .fetchPopular()
            .then(res => {
                scrollWin();
                refs.gallery.innerHTML = createMarkup(transformMovieObject(res.results));
            }); 
    } else {
        createCard('', event.target.value);
        setTimeout(() => {
          event.target.value = '';
        }, 1500);
    }
});

function createCard(genre, year) {
    movieFilter.fetchMovies(genre, year)
        .then(res => {
            scrollWin();
            refs.gallery.innerHTML = createMarkup(transformMovieObject(res.results));
        });
}

function transformMovieObject(movies) {
  movies.forEach(elem => {
    if (elem.title.length > 38) {
      elem.title = elem.title.slice(0, 38) + '...';
    }
    elem.poster_path
      ? (elem.poster_path = `https://image.tmdb.org/t/p/w500/${elem.poster_path}`)
      : (elem.poster_path = settings.reservImg);
    elem.release_date = elem.release_date.slice(0, 4);
    elem.genre_ids = fetchPopularMovie.ganreTranspiler(elem.genre_ids);
    elem.genre_ids = elem.genre_ids.slice(0, 3).join(', ');
  });
  return movies;
}

function scrollWin() {
  window.scrollTo(0, 230);
}


const yearpicker = function() {
  let startYear = 1900;
  let endYear = new Date().getFullYear();
  $('#yearpicker').append(
    $('<option />').val('').html('Choose year'),
  );
  for (let i = endYear; i > startYear; i--) {
    $('#yearpicker').append($('<option />').val(i).html(i));
  }
}
yearpicker();


