const KEY = '6df9a2b88a6cdc986e05b3daaeb09968';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';
// правильный API
// https://api.themoviedb.org/3/search/movie?api_key=6df9a2b88a6cdc986e05b3daaeb09968&query=seven&page=1

export default class newsApiService{
    constructor (){
        this.searchQuery = '';
        this.page = 1;
    }    
    async fetchFilm () {
        const url = `${BASE_URL}api_key=${KEY}&query=${this.searchQuery}&page=${this.page}`;
        // `${BASE_URL}${this.searchQuery}api_key=${KEY}`;
        const picture = await fetch(url);
        const newFilms = await picture.json();   
          
        // const increment = await (this.incrementPage(newFilms));       
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