import refs from './refs.js';
import spinner from './spinner.js';

const BASE_URL = "https://api.themoviedb.org/3/movie";
const apiKey = "6df9a2b88a6cdc986e05b3daaeb09968";

function fetchOneFilm(movie_id) {
    spinner.spin(refs.loadSpinner);
    return fetch(`${BASE_URL}/${movie_id}?api_key=${apiKey}&language=en-US`)
        .then(response => {
            if (!response.ok) return Promise.reject('Server error!');
            return response.json();
            });
}

export default fetchOneFilm;
