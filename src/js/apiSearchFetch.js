const apiKey = '2d2272085b6a086155bacb1413ae9080';

export default {
    searchQuery: " ",

fetchMovie(searchQuery) {
     
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.query}`;
    
return fetch(url)
.then(res => res.json())
.then(({results}) =>
 console.log(results))
},

get query(){
    return this.searchQuery;
  },
  
  set query(newQuery){
    this.searchQuery = newQuery;
  },
};