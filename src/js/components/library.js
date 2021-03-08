// import external modules here:
import searchMovie from '../apiFilmFetch';
// import Refs here:
import refs from '../refs.js';
// import templates:
import libraryTemplate from '../../templates/library.hbs';
import libraryCardTemplate from '../../templates/library__card.hbs';

export function libraryMarkupBuilder(currentPageIDs = []) {
  const data = currentPageIDs.map(pageID =>
    searchMovie(pageID).then(resData => {
      const cardData = {
        id: resData.id,
        poster_path: `https://image.tmdb.org/t/p/original${resData.poster_path}`,
        title: resData.title,
        genres: resData.genres.map(genre => genre.name).toString(),
        release_date: resData.release_date,
        vote_average: resData.vote_average,
      };
      //   console.log(cardData);
      const cardMarkup = libraryCardTemplate(cardData);
    //   console.log(cardMarkup);
      refs.libraryList.insertAdjacentHTML('beforeend', cardMarkup);
      return cardMarkup;
    })
    ,
  );

}
