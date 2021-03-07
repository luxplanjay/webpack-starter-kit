const token = '6b8ef447c2ce3d010bfcc7f710d71588';

function searchMovie(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${token}`;
  return fetch(url)
    .then(res => res.json())
    .then(film => {
      console.log(`film: `, film);
      return film;
    })
    .catch(error => console.log(error));
}
// console.log(`searchMovie(movie_id): `, searchMovie(512896));
export default searchMovie;
