export function setGenresString(genresArray) {
  const reqGenres = [];
  genresArray.map(res => reqGenres.push(` ${res.name}`));
  if (reqGenres.length > 3) {
    reqGenres.splice(2);
    reqGenres.push(' Other');
  }
  reqGenres.toString().trim();
  return reqGenres;
}

export function genresFilter(data, genreIds) {
  const filtredData = data.filter(genre =>
    genreIds.find(genreId => genre.id === genreId),
  );
  return setGenresString(filtredData);
}

export function getCardData(results, genresData) {
  results.map(result => {
    result.release_date = result.release_date.slice(0, 4);
    result.poster_path =
      'https://image.tmdb.org/t/p/w500/' + result.poster_path;
    result.genre_ids = genresFilter(genresData, result.genre_ids);
    return result;
  });
  return results;
}
