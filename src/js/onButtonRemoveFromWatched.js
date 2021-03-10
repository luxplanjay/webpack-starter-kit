function onButtonRemoveFromWatched(selectedFilm) {
  const filmsArray = [];
  const currentFilmsWatched = localStorage.getItem('filmsWatched');
  
  if (currentFilmsWatched) {
  
    let filmsArray = JSON.parse(currentFilmsWatched);
    //console.log(filmsArray);
    if (filmsArray.find(({ id }) => id === selectedFilm.id)) {
     
      const idxToRemove = filmsArray.findIndex(el => el.id === selectedFilm.id);
    
      filmsArray.splice(idxToRemove, 1);
      localStorage.setItem('filmsWatched', JSON.stringify(filmsArray));
      const buttonAddToWatchedRef = document.querySelector(
        '.modal__watched-button',
      );
     
      buttonAddToWatchedRef.classList.remove('active');
      buttonAddToWatchedRef.textContent = 'ADD TO WATCHED';
    } else {
      console.log('not find');
    }
  }
}

export default onButtonRemoveFromWatched;
