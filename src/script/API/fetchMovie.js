import settings from '../js/settings';

const { BASE_URL, API_KEY  } = settings;

export default class MovieApi {
    constructor() {
        
    }
    fetchMovie(id) {
        const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
        return fetch(url)
        .then(response => response.ok ? response.json() : [])
        .catch(error => console.log(error));
    }
}
