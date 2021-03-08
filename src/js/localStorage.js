export default {
  getFilms(key) {
    const filmsLocalStorage = localStorage.getItem(key);
    if (filmsLocalStorage !== null) {
      return JSON.parse(filmsLocalStorage);
    }
    return [];
  },

  putFilms(key, id) {
    let films = this.getFilms(key);
    let pushFilm = false;
    const index = films.indexOf(id);
    if (index === -1) {
      films.unshift(id);
      pushFilm = true;
    } else {
      films.splice(index, 1);
    }

    localStorage.setItem(key, JSON.stringify(films));
    return { pushFilm, films };
  },
};
