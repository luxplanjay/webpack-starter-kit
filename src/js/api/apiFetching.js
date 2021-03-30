import variables from '../settingsApi/apiVariables';

const { BASE_URL, API_KEY } = variables;

const api = {
  fetchPopularFilms(page = '') {
    const url = `${BASE_URL}/3/trending/movie/week?api_key=${API_KEY}&page=${page}`;
    return fetch(url)
      .then(response => {
        if (response.ok) return console.log(response.json());
      })
      .catch(() => console.error('no popular'));
  },
  fetchFilmByQuery(page = '', searchQuery = '') {
    const url = `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
    return fetch(url)
      .then(response => {
        if (response.ok) return response.json();
      })
      .catch(() => console.error('film is nod find!'));
  },
  fetchGanres() {
    const url = `${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}`;
    return fetch(url)
      .then(response => {
        if (response.ok) return response.json();
      })
      .catch(() => console.error('no ganres'));
  },
};

export default api;
