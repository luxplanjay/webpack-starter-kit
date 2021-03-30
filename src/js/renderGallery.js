import movieGalleryCardTpl from '../tamplates/movie-gallery-card.hbs';

class NewGetMovie {
  constructor() {}

  fetchTrendingMovie() {
    const url =
      'https://api.themoviedb.org/3/trending/movie/day?api_key=6df9a2b88a6cdc986e05b3daaeb09968';
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        return data.results;
      });
  }
}

const getMovies = new NewGetMovie();
const galleryRef = document.querySelector('.gallery');

function toCreateGallery() {
  getMovies
    .fetchTrendingMovie()
    .then(results => {
      const markup = movieGalleryCardTpl(results);
      console.log(markup);
      galleryRef.innerHTML = markup;
    })
    .catch(error => {
      console.log(error);
    });
}

toCreateGallery();
