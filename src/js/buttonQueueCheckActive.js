import onButtonAddToQueue from './onButtonAddToQueue';
import onButtonRemoveFromQueue from './onButtonRemoveFromQueue';

function checkButtonQueueActive(film) {
    const buttonAddToQueueRef = document.querySelector('.modal__queue-button');
        // console.log(
        //     buttonAddToWatchedRef.classList.contains('active')
        // )
        if(buttonAddToQueueRef.classList.contains('active')) {
            onButtonRemoveFromQueue(film);
        }
        else {onButtonAddToQueue(film);

        };

}
export default checkButtonQueueActive;