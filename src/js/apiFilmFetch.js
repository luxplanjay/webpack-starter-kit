const apiKey = '2d2272085b6a086155bacb1413ae9080';

function searchMovie(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`
    return fetch(url).then(res => res.json()).then((film) => {
         return film;
        }).catch(error => console.log(error));
}
export default searchMovie;