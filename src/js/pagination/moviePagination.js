import api from '../api/apiFetching';
 import moviesListTemplate from '../../template/cardTemp.hbs';
import { generatePosterPath } from '../movieHelpers/generatePoster';

class MoviePagination{
    #movies = [];
    constructor(selector) {
      this.element = document.querySelector(selector);
      this.#movies = [];
      this.currentPage = 1;
      this.totalPages = 0;
      this.totalGenres = [];
      this.goToPrevPage = this.goToPrevPage.bind(this);
      this.goToNextPage = this.goToNextPage.bind(this);
      this.loadFirst = this.loadFirst.bind(this);
    }
    get movies() {
        return this.#movies;
      }
    
      set movies(movieList) {
        if (!movieList) {
          console.error('list non exist');
        }
    
        this.#movies = movieList;
        this.render();
      }
      getAllGenres(){                        //load at once before using other methods
        api.fetchGanres().then(result=>{
          const { genres } = result;
          this.totalGenres = [...genres];         
        });
      }
      
      findFilmGenres(){
               this.movies.forEach(movie =>{
                 for(let i = 0; i < movie.genre_ids.length; i++){
                  const searchGenre =  this.totalGenres
                    .find(genreItem => genreItem.id ===  movie.genre_ids[i]);
                    movie.genre_ids[i] = searchGenre.name;
                  }
                  movie.backdrop_path = generatePosterPath(movie.backdrop_path);
               })
      }
      goToPrevPage() {
        if (this.currentPage === 1) {
          return;
        }
    
        this.currentPage -= 1;
        this.fetchMovies().then((results) => {
          this.movies = results;
          this.render();
        });
      }
    
      goToNextPage() {
        if (this.currentPage === this.totalPages) {
          return;
        }
 
        this.currentPage += 1;
        this.fetchMovies().then((results) => {
          this.movies = results;
          this.render();
        });
      }
    
      addMovies(newMovies) {
        this.movies = [...this.movies, ...newMovies];
      }

      loadFirst() {
        return this.fetchMovies()
         .then(data => {
          this.addMovies(data.results);
         });
      }
    
     
      fetchMovies() {
        return api
          .fetchPopularFilms(this.currentPage)
          .then(data => {
            const {results, total_pages} = data;
            this.totalPages = total_pages;
            this.#movies = results;
            this.findFilmGenres();
            return this.movies;
          })
      }
    
      render() {
         this.element.innerHTML = moviesListTemplate(this.movies);
      }
}
  
  export default MoviePagination;