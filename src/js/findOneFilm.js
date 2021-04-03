import refs from './refs.js';
import spinner from './spinner.js';

const apiKey = "api_key=6df9a2b88a6cdc986e05b3daaeb09968";

function fetchOneFilm(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?${apiKey}`;
    spinner.spin(refs.loadSpinner);
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error)).finally(() => {
            spinner.stop();
        });
}

export default fetchOneFilm;