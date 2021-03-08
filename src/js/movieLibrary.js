import {Server} from './Firebase';
import refs from './refs';

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
  // else {
  //   refs.addToWatchedBtn.innerHTML = 'REMOVE FROM WATCHED';
  // };

  Server.addToWatched(all);
  localStorage.setItem('watched', JSON.stringify(all));
}

function handleQueue(event) {
  event.preventDefault();
  refs.addToQueueBtn.innerHTML = 'REMOVE FROM QUEUE';
    const id = event.target.dataset.id; 
    const all = JSON.parse(localStorage.getItem('queue') || '[]');    
    if (!all.includes(id)) { all.push(id) };     
    Server.addToQueue(all);
     localStorage.setItem('queue', JSON.stringify(all));
}