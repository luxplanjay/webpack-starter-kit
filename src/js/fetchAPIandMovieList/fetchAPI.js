const myKey = '1690d1319b4e719ac3308f10c68ac649';
const moviesContainerRef = document.querySelector('.movies-container-js');
const movieInputRef = document.querySelector('.movie-searchTag-js');
export default {
  searchTag: '',
  page: 1,
  itemsPerPage: 9,
  adult: 'false', //false,true / отображать взрослый контент или нет
  language: 'en-US', //ru-RU,ua-UA,en-US.....
  validTimeWindow: 'day', //day,week  /  выбор между тренды за неделю или за день
  validMediaType: 'movie', //all,movie,tv,person / тренды выбор всё,толькоо фильмы,только сериалы, по популярным актёрам
  genresArray: [], // массив ид и имен жанров
  errorHandler(error) {
    //обработчик ошибок ( кетчей )
    moviesContainerRef.innerHTML =
      error + '. It is a server error , Pls just try again!';
  },
  fetchGenres() {
    //Функция забирает с сервера массив с именами и ид жанров
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${myKey}&language=${this.language}`;
    const f = fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => response.genres)
      .catch(this.errorHandler);
    f.then(res => {
      this.genresArray = res.slice();
    });
  },
  getMoviesWithGenreNames(response) {
    //Функция заменяет для фильма ид жанров на их имена

    response.results.map(movie => {
      if (movie.genre_ids.length === 0) {
        movie.genre_ids.push('Genre');
      } else {
        const genresNamesArr = movie.genre_ids.map(movieGenre => {
          const newEl = this.genresArray.find(genre => genre.id === movieGenre);
          return newEl.name;
        });
        movie.genre_ids = genresNamesArr.slice();
      }
      if (movie.release_date === '') {
        movie.release_date = 'Year';
      } else {
        movie.release_date = movie.release_date.substring(0, 4);
      }

      return movie;
    });
  },
  resetPageToFirst() {
    //сброс на 1ю страницу
    this.page = 1;
  },
  get movieName() {
    return this.searchTag;
  },
  set movieName(value) {
    this.searchTag = value;
  },
  searchMoviesbyTag() {
    //Поиск фильма по тому что ввели в инпут
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=${this.language}&query=${this.searchTag}&page=${this.page}&per_page=${this.itemsPerPage}&include_adult=${this.adult}`;
    this.fetchGenres();
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        console.log(response); // в консоле можно посмотреть что пришло нам
        if (response.results.length === 0) {
          moviesContainerRef.innerHTML = 'No movies found , try another name';
          return;
        }
        this.getMoviesWithGenreNames(response);
        this.page += 1;
        return response.results;
      })
      .catch(this.errorHandler);
  },
  getTrendingMovies(page = 1) {
    //Забирает с сервера трендовые фильмы , по умолчанию за день
    movieInputRef.value = '';
    const url = `https://api.themoviedb.org/3/trending/${this.validMediaType}/${this.validTimeWindow}?api_key=${myKey}&language=${this.language}&page=${page}&per_page=${this.itemsPerPage}`;
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
        return response;
      })
      .catch(this.errorHandler);
  },
  getFullMovieInfo(movie_Id) {
    // возвращает полное инфо по фильму
    // movie_Id можно взять из Li dataset.movieId к примеру getFullMovieInfo(event.target.dataset.movieId)
    const url = `https://api.themoviedb.org/3/movie/${movie_Id}?api_key=${myKey}&language=en-US`;
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(this.errorHandler);
  },
};
