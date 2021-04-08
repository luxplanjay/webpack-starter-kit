import './apiService';
const debounce = require('lodash.debounce');
import refs from './refs';
import filmTpl from '../tamplates/movie-gallery-card.hbs';
import NewApiService from './apiService';
import toCreateGallery from'./renderGallery';
const newsApiService = new NewApiService();

refs.formRef.addEventListener('input', debounce(onSearch, 500));

async function onSearch (e) {
    e.preventDefault();
    try {        
     clearArticlesConteiner();     
    newsApiService.query = e.target.value;    
        if (newsApiService.query.trim() === '') {
        refs.spanRef.classList.add('js-notification');
        toCreateGallery();              
        return 
    }   else {
        refs.spanRef.classList.remove('js-notification');
    }
    newsApiService.resetPage();
    const fetch = await newsApiService.fetchFilm(); 
    if (fetch.total_results === 0){ 
        refs.spanRef.classList.add('js-notification');        
        toCreateGallery();              
        return 
    }   else {
        refs.spanRef.classList.remove('js-notification');
    }
    const marcup = await addArticlesMarcup(fetch.results);    
    return marcup;  
    } 
    catch (error) {  
        console.log('error');      
    }    
}
 function addArticlesMarcup(newFilms) {     
   return refs.gallery.insertAdjacentHTML('beforeend', filmTpl(newFilms));    
}
function clearArticlesConteiner() {    
    refs.gallery.innerHTML = '';
}


