function onButtonRemoveFromQueue(selectedFilm) {
  const filmsQueue = [];
  const currentFilmsQueue = localStorage.getItem('filmsQueue');
  
  if (currentFilmsQueue) {
  
    let filmsQueue = JSON.parse(currentFilmsQueue);
    //console.log(filmsArray);
    if (filmsQueue.find(({ id }) => id === selectedFilm.id)) {
     
      const idxToRemove = filmsQueue.findIndex(el => el.id === selectedFilm.id);
    
      filmsQueue.splice(idxToRemove, 1);
      localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
      const buttonAddToQueueRef = document.querySelector('.modal__queue-button');
     
      buttonAddToQueueRef.classList.remove('active');
      buttonAddToQueueRef.textContent = 'ADD TO QUEUE';
    } 
    else {
      console.log('not find');
    }
  }
}

export default onButtonRemoveFromQueue;
