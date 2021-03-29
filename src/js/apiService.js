const KEY = '6df9a2b88a6cdc986e05b3daaeb09968';
const BASE_URL = 'https://api.themoviedb.org/3/movie/550?';

export default class newApiService{
    constructor() {
        this.searchQuerry = '';
        this.page =1;
    }
    async fetchFilm(){
        const url = `${BASE_URL}api_key=${KEY}`;
        const movie = await fetch(url);
        const newMovie = await movie.json();
        // return newMovie;
    }

}