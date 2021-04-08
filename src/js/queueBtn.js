import localStorageApi from './localStorageApi';
import movieGalleryCard from '../tamplates/movie-gallery-card.hbs';
// import { pagination } from './paginstion';
// import headerLibraryBtn from './refs';
import placeholder from './spinner';

const refs = {
    storageList: document.querySelector('.controls'),
    cardLibrary: document.querySelector('.library-movie-gallery'),
    // paginationContainer: document.querySelector('.pagination'),
    headerLibraryBtn: document.querySelector('.header-library-btn'),
    activeBtn: document.querySelector('.btn-active'),
};


function renderMovies() {
    const key = getCheckedLiblary();
    const idList = localStorageApi.getMovies(key);
    
    refs.cardLibrary.dataset.library = key;
    saveCurrentLibrary(key);
    
    if (idList.length) {
        placeholder.spinner.show();
        getMovies(idList.slice(0, 20)).then(moviesArray => {
            renderMarkup(moviesArray);
            placeholder.spinner.close();
        });
    }
}

function getCheckedLiblary() {
    return refs.activeBtn.value;
}

const getMovies = async idList => {
    const key = '6df9a2b88a6cdc986e05b3daaeb09968';
    const baseUrl = 'https://api.themoviedb.org/3/movie/';

    const promises = idList.map(id => {
        const url = `${baseUrl}${id}?api_key=${key}`;
        return fetch(url)
        .then(r => r.json())
        .then(data => ({
            ...data,
            release_date: data.release_date.split('-')[0],
        }));
    });

    return await Promise.all(promises);
};

function renderMarkup(moviesArray) {
    refs.cardLibrary.innerHTML = movieGalleryCard(moviesArray);
}

function getCurrentLibrary() {
    const storageName = 'movieInfo';
    const userPoint = localStorageApi.load(storageName);
    if (userPoint !== null) {
        const selectedBtn = document.querySelector(`[value="${userPoint.currentLibrary}"]`).classList.add('btn-active');;
        console.log(selectedBtn);
    }
}

function saveCurrentLibrary(currentLibrary) {
    localStorageApi.save(storageName, { currentLibrary });
}

getCurrentLibrary();
renderMovies();

refs.storageList.addEventListener('click', renderMovies);

