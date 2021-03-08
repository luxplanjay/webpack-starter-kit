// import { Server } from './js/Firebase';
import refs from './refs';

refs.addToWatchedBtn.addEventListener('click', handleWatched);
refs.addToQueueBtn.addEventListener('click', handleQueue);


function handleWatched(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    const all = JSON.parse(localStorage.getItem('watched') || '[]');
    all.includes(id)
      ? console.log('фильм уже есть в LocalStorage')
      : all.push(id); 
          
    localStorage.setItem('watched', JSON.stringify(all));
  
}

function handleQueue(event) {
   event.preventDefault();
    const id = event.target.dataset.id; 
    const all = JSON.parse(localStorage.getItem('queue') || '[]');    
    all.includes(id) ? console.log('фильм уже есть в LocalStorage') : all.push(id);     

     localStorage.setItem('queue', JSON.stringify(all));
}