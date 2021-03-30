import { generatePosterPath } from '../movieHelpers/generatePoster';
// import api from '../api/apiFetching'

const MAX_RATING = 10;

const movieAdapter = ({
    // genre_ids,
    release_date,
    poster_path,
    original_title,
    vote_average,
  }) => ({
    // ganres: api.fetchGanres().then(result =>{const {genres} = result; console.log(findGenre(genres, genre_ids)); }),
    imgSrc: generatePosterPath(poster_path),
    title: original_title,
    rating: Math.round((vote_average / MAX_RATING) * 100) + '%',
    releaseDate: release_date,
  });

  // function findGenre(genresArray, ganre_ids) {
  //      let arrayOfGenres = [];
  //       for(let i = 0; i < ganre_ids.length; i++){
  //          genresArray
  //          .find(genreItem =>{
  //             if(genreItem.id ===  ganre_ids[i])
  //               return arrayOfGenres.push(genreItem.name);
  //            });
  //       }
  //       return console.log(arrayOfGenres);
  //   }
  export default movieAdapter;
