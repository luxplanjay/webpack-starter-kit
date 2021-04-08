const KEY = '6df9a2b88a6cdc986e05b3daaeb09968';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';

export default class newsApiService{
    constructor (){
        this.searchQuery = '';
        this.page = 1;
    }    
    async fetchFilm () {
        const url = `${BASE_URL}api_key=${KEY}&query=${this.searchQuery}&page=${this.page}`;        
        const film = await fetch(url);
        const newFilms = await film.json();              
        return newFilms;
    }
    incrementPage(){
        this.page +=1;
    }
    resetPage(){
        this.page = 1;
    }
    get query(){
        return this.searchQuery;
    }
    set query(newQuery){
        return this.searchQuery = newQuery;
    }
}