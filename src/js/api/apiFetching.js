import variables from './apiVariables';

const { BASE_URL, API_KEY } = variables;

const api = {
  fetchPopularFilms(page = '') {
    const url = `${BASE_URL}/3/movie/popular?api_key=${API_KEY}&page=${page}`;
    return fetch(url)
      .then(rawData => {
        if (rawData.ok) return rawData.json();
      })
      .catch(() => console.error('no popular'));
  },
  fetchFilmByQuery(page = '', searchQuery = '') {
    const url = `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
    return fetch(url)
      .then(rawData => {
        if (rawData.ok) return rawData.json();
      })
      .catch(() => console.error('film is nod find!'));
  },
};

export default api;
