import spinner from '../templates/spinner.hbs';
import refs from '../js/refs';

const processingSpinner = () => {
    refs.movieGrid.innerHTML = '';
    refs.homeGallery.insertAdjacentHTML('afterbegin', spinner());
}

const deleteSpinner = () => { 
    const spinnerRef = document.querySelector('.spinner-position');
    spinnerRef.remove() 
}

export { processingSpinner, deleteSpinner };