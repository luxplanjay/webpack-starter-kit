import settings from '../js/settings';

const { BASE_URL, API_KEY  } = settings;

export default class MovieFilter {
    constructor() {
        this._page = 1;
    }
    fetchMovies(genre, year) {
        const url = `${BASE_URL}/discover/movie?with_genres=${genre}&primary_release_year=${year}&sort_by=vote_average.desc&api_key=${API_KEY}&page=${this._page}`;
        return fetch(url)
        .then(response => response.ok ? response.json() : [])
        .catch(error => console.log(error));
    }
}