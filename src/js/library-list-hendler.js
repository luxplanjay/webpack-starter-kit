import refs from './refs';




export default function onLibraryListClick(event) {
    if (event.target.nodeName === 'BUTTON' && event.target.classList.contains('is-active')) {
        return;
    } else if (event.target.nodeName === 'BUTTON') {
        refs.watchedBtn.classList.toggle('is-active');
        refs.queueBtn.classList.toggle('is-active');
    }
}


refs.libraryList.addEventListener('click', onLibraryListClick);


