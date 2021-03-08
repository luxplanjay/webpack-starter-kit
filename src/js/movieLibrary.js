import {Server} from './Firebase';
import refs from './refs';

refs.addToWatchedBtn.addEventListener('click', handleWatched);
refs.addToQueueBtn.addEventListener('click', handleQueue);


function handleWatched(event) {
  event.preventDefault();
  const id = event.target.dataset.id;
  const all = JSON.parse(localStorage.getItem('watched') || '[]');
    if (!all.includes(id)) { all.push(id) };

  Server.addToWatched(all);
  localStorage.setItem('watched', JSON.stringify(all));
}

function handleQueue(event) {
   event.preventDefault();
    const id = event.target.dataset.id; 
    const all = JSON.parse(localStorage.getItem('queue') || '[]');    
    if (!all.includes(id)) { all.push(id) };     
    Server.addToQueue(all);
     localStorage.setItem('queue', JSON.stringify(all));
}