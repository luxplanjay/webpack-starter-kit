import api from '../api/apiFetching';
// import moviesListTemplate from '../../templates/moviesList.hbs';
import movieAdapter from '../movieHelpers/adapterData';

class MoviePagination{
    #movies = [];
    // constructor(selector)
    constructor() {
      // this.element = document.querySelector(selector);
      this.#movies = [];
      this.currentPage = 1;
      this.totalPages = 0;
      this.totalGenres = [];
      this.goToPrevPage = this.goToPrevPage.bind(this);
      this.goToNextPage = this.goToNextPage.bind(this);
      this.loadMore = this.loadMore.bind(this);
    }
    get movies() {
        return this.#movies;
      }
    
      set movies(movieList) {
        if (!movieList) {
          console.error('list non exist');
        }
    
        this.#movies = movieList;
        // this.render();
      }
      getAllGenres(){
        api.fetchGanres().then(result=>{
          const { genres } = result;
          this.totalGenres = [...genres];
          console.log(this.totalGenres);
        });
      }
      // findFilmGenres(arr){
      // this.getAllGenres();
      //          let arrayOfGenres = [];
      //           for(let i = 0; i < movie.genre_ids.length; i++){
      //              this.totalGenres
      //              .find(genreItem =>{
      //                 if(genreItem.id ===  movie.genre_ids[i])
      //                   return arrayOfGenres.push(genreItem.name);
      //                });
      //           }
      //           return movie.genre_ids = arrayOfGenres;
      // }
      goToPrevPage() {
        if (this.currentPage === 1) {
          return;
        }
    
        this.currentPage -= 1;
        this.fetchMovies().then(({ results }) => {
          this.movies = this.convertMoviesData(results);
        });
      }
    
      goToNextPage() {
        if (this.currentPage === this.totalPages) {
          return;
        }
    
        this.currentPage += 1;
        this.fetchMovies().then(({ results }) => {
          this.movies = this.convertMoviesData(results);
        });
      }
    
      loadMore() {
        this.currentPage += 1;
        return this.fetchMovies().then(({ results }) => {
          this.addMovies(this.convertMoviesData(results));
        });
      }
    
      addMovies(newMovies) {
        this.movies = [...this.movies, ...newMovies];
      }
      fetchMovies() {
        return api
          .fetchPopularFilms(this.currentPage)
          .then(({ results, total_pages }) => ({ results, total_pages }))
          .then(result => this.findFilmGenres(result));
      }
    
      mount() {
        this.fetchMovies().then(({ results, total_pages }) => {
          this.movies = this.convertMoviesData(results);
          this.totalPages = total_pages;
        });
      }
    
      render() {
        // this.element.innerHTML = moviesListTemplate(this.movies);
      }
      
  convertMoviesData(movieList) {
    return movieList.map(movie => movieAdapter(movie));
  }
}
  
  export default MoviePagination;