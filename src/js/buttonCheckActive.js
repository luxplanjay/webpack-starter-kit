import onButtonRemoveFromWatched from './onButtonRemoveFromWatched';
import onButtonAddToWatched from './onButtonAddToWatched';

function checkButtonWatchedActive(film) {
    const buttonAddToWatchedRef = document.querySelector(
        '.modal__watched-button');
        // console.log(
        //     buttonAddToWatchedRef.classList.contains('active')
        // )
        if(buttonAddToWatchedRef.classList.contains('active')) {
            onButtonRemoveFromWatched(film);
        }
        else {onButtonAddToWatched(film);

        };

}
export default checkButtonWatchedActive;