const myKey = '1690d1319b4e719ac3308f10c68ac649';
const moviesContainerRef = document.querySelector('.movies-container-js');
const movieInputRef = document.querySelector('.movie-searchTag-js');
export default {
  searchTag: '',
  page: 1,
  itemsPerPage: 9,
  adult: 'false', //false,true
  language: 'ru-RU', //ru-RU,ua-UA,en-US.....
  validTimeWindow: 'week', //day,week
  validMediaType: 'movie', //all,movie,tv,person
  genresArray: [],
  fetchGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${myKey}&language=ru-RU`;
    const f = fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => response.genres)
      .catch(e => {
        moviesContainerRef.innerHTML = e;
      });
    f.then(res => {
      this.genresArray = res.slice();
    });
  },
  getMoviesWithGenreNames(response) {
    response.results.map(movie => {
      const genresNamesArr = movie.genre_ids.map(element => {
        const newEl = this.genresArray.find(el => el.id === element);
        return newEl.name;
      });
      movie.genre_ids = genresNamesArr.slice();
      movie.release_date = movie.release_date.substring(0, 4);
      return movie;
    });
  },
  resetPageToFirst() {
    this.page = 1;
  },
  get movieName() {
    return this.searchTag;
  },
  set movieName(value) {
    this.searchTag = value;
  },
  searchMoviesbyTag() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=${this.language}&query=${this.searchTag}&page=${this.page}&per_page=${this.itemsPerPage}&include_adult=${this.adult}`;
    this.fetchGenres();
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        this.getMoviesWithGenreNames(response);
        this.page += 1;
        if (response.results.length === 0) {
          moviesContainerRef.innerHTML =
            'Невозможно найти фильм , попробуйте другое название';
          return;
        }
        return response.results;
      })
      .catch(e => {
        moviesContainerRef.innerHTML = e;
      });
  },
  getTrendingMovies() {
    moviesContainerRef.innerHTML = '';
    movieInputRef.value = '';
    const url = `https://api.themoviedb.org/3/trending/${this.validMediaType}/${this.validTimeWindow}?api_key=${myKey}&language=${this.language}`;
    this.fetchGenres();
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        this.getMoviesWithGenreNames(response);
        response.results.map(el => {});
        this.page += 1;

        return response.results;
      })
      .catch(e => {
        moviesContainerRef.innerHTML = e;
      });
  },
};
