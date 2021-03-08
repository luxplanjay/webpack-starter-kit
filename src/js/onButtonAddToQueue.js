function onButtonAddToQueue(selectedFilm) {
  let filmsArray = [];
  const currentFilmsQueue = localStorage.getItem('filmsQueue');

  if (currentFilmsQueue) {
    // console.log(
    //   'уже есть массив с сохранёнными фильмами, добавляем объект с новым фильмом',
    // );

    filmsArray = JSON.parse(currentFilmsQueue);

    if (!filmsArray.find(({ id }) => id === selectedFilm.id)) {
      filmsArray.push(selectedFilm);
      localStorage.setItem('filmsQueue', JSON.stringify(filmsArray));
    }
  } else {
    // console.log('массива с сохранёнными фильмами пока нет, создаём');

    filmsArray.push(selectedFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(filmsArray));
  }

  console.log(localStorage.getItem('filmsQueue'));
}

export default onButtonAddToQueue;
