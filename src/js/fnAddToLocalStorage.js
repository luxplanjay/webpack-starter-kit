import localStorageApi from './localStorageApi';

export const initStorageBtns = () => {
  const storageElement = document.querySelector('.movie-container .storage');
  const movieId = document.querySelector('.movie-container').dataset.action;

  checkStorage(storageElement);

  storageElement.addEventListener('change', onStorageBtnClick);

  function onStorageBtnClick(element) { 
  
    const storageKey = element.target.value;
    // console.log(storageKey);

    
    const action = (element.target.checked) ? 'add' : 'remove';

    localStorageApi.getMovies(storageKey);
    makeActionInStorage({ storageKey, movieId, action });
  }

  function checkStorage(storageElement) { 

  const btnElement = storageElement.querySelectorAll('[type=checkbox]');
  
    btnElement.forEach(element => {
      const storageKey = element.value;
      const arr = localStorageApi.load(storageKey);
      // console.log(arr);
      // console.log(movieId);
      // console.log(arr.indexOf(movieId));
      if (arr.indexOf(movieId) >= 0) element.checked = "true";    
    });
  } 
}

function makeActionInStorage({movieKey, movieId, action}) { 
  if (action === 'add') {
    localStorageApi.addMovie(movieKey, movieId);
    changeLibraryCardDisplay('initial');
  }
    
  if (action === 'remove') {
    localStorageApi.removeMovie(movieKey, movieId);
    changeLibraryCardDisplay('none');
  }

  function changeLibraryCardDisplay(value) { 
      const libraryCard = document.querySelector(`[data-library="${movieKey}"] [data-action="${movieId}"]`);
    //   установить на соответствующие окна в библиотеле data - library = watched и data - library = queue !!!!!!
    if (libraryCard) libraryCard.style.display = value;
  }
}
