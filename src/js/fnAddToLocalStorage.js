import localStorageApi from './localStorageApi';

// ДОБАВИТЬ В МОДАЛ.ДЖС НА ОТКРЫТИЕ МОДАЛКИ
export const initStorageBtns = () => {
  const storageElement = document.querySelector('.movie-container .add-to-storage-bnts');
  const movieId = document.querySelector('.movie-container').dataset.action;

  checkStorage(storageElem);

  storageElement.addEventListener('change', onStorageBtnClick);

  function onStorageBtnClick(e) { 
  
    const storageKey = e.target.value;
    
    const action = (e.target.checked) ? 'add' : 'remove';

    localStorageApi.getMovies(storageKey);
    makeActionInStorage({ storageKey, movieId, action });
  }

  function checkStorage(storageElement) { 

  const btnElement = storageElement.querySelectorAll('.storage__input');
  
    btnElement.forEach(element => {
      const storageKey = element.value;

      const arr = localStorageApi.load(storageKey);
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