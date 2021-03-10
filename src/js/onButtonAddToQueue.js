function onButtonAddToQueue(selectedFilm) {
  let filmsQueue = [];
  const currentFilmsQueue = localStorage.getItem('filmsQueue');

  if (currentFilmsQueue) {
    // console.log(
    //   'уже есть массив с сохранёнными фильмами, добавляем объект с новым фильмом',
    // );

    filmsQueue = JSON.parse(currentFilmsQueue);

     const buttonAddToQueueRef = document.querySelector('.modal__queue-button');
     buttonAddToQueueRef.classList.add('active');
     buttonAddToQueueRef.textContent = 'QUEUE';

    if (!filmsQueue.find(({ id }) => id === selectedFilm.id)) {
      filmsQueue.push(selectedFilm);
      localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
    }
  } else {
    // console.log('массива с сохранёнными фильмами пока нет, создаём');

    filmsQueue.push(selectedFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
  }
}

export default onButtonAddToQueue;
