import localStorageApi from './localStorageApi';

export const initStorageBtns = () => {
  const storageElement = document.querySelector('.movie-container .storage');
  const movieId = document.querySelector('.movie-container').dataset.action;

  checkStorage(storageElement);

  storageElement.addEventListener('change', onStorageBtnClick);

  function onStorageBtnClick(event) { 
  
    const storageKey = event.target.value;
    
    const action = (event.target.checked) ? 'add' : 'remove';

    localStorageApi.getMovies(storageKey);
    makeActionInStorage({ storageKey, movieId, action });
  }

  function checkStorage(storageElement) { 

  const btnElement = storageElement.querySelectorAll('[type=checkbox]');
  
  btnElement.forEach(element => {
      const storageKey = element.value;
      const arr = localStorageApi.load(storageKey);
      if (arr !== undefined && arr.indexOf(movieId) >= 0) element.checked = "true";
  });
  } 
}

function makeActionInStorage({storageKey, movieId, action}) { 
  if (action === 'add') {
    localStorageApi.addMovie(storageKey, movieId);
    changeLibraryCardDisplay('initial');
  }
    
  if (action === 'remove') {
    localStorageApi.removeMovie(storageKey, movieId);
    changeLibraryCardDisplay('none');
  }

  function changeLibraryCardDisplay(value) { 
      const libraryCard = document.querySelector(`[data-library="${storageKey}"] [data-action="${movieId}"]`);
    if (libraryCard) libraryCard.style.display = value;
  }
}
