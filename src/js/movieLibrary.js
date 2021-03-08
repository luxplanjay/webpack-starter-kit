import {Server} from './Firebase';
import refs from './refs';
// import { Server } from 'core-js/fn/array';

refs.addToWatchedBtn.addEventListener('click', handleWatched);
refs.addToQueueBtn.addEventListener('click', handleQueue);
// refs.watchedBtnLibrary.addEventListener('click', Btn);

// function Btn(event) {
//   console.dir(event.target);
//   if (event.target.className === 'button button--library') {
//     console.log('Click!');
//   }; 
// }

function handleWatched(event) {
  event.preventDefault();
  refs.addToWatchedBtn.innerHTML = 'REMOVE FROM WATCHED';
  const id = event.target.dataset.id;
  const all = JSON.parse(localStorage.getItem('watched') || '[]');
  if (!all.includes(id)) { all.push(id) }
  else {
    all.splice(all.indexOf(id), 1);
    refs.addToWatchedBtn.innerHTML = 'ADD TO WATCHED';
  };

  // Server.addToWatched(all);
  localStorage.setItem('watched', JSON.stringify(all));
}

function handleQueue(event) {
  event.preventDefault();
  refs.addToQueueBtn.innerHTML = 'REMOVE FROM QUEUE';
    const id = event.target.dataset.id; 
    const all = JSON.parse(localStorage.getItem('queue') || '[]');    
  if (!all.includes(id)) {
    all.push(id);
  } else {
    all.splice(all.indexOf(id), 1);
    refs.addToQueueBtn.innerHTML = 'ADD TO QUEUE';
  };     
    // Server.addToQueue(all);
     localStorage.setItem('queue', JSON.stringify(all));
}